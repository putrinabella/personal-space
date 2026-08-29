// app/api/beauty/alerts/route.ts
import { db } from "@/db";
import { beautyItemUnits, beautyItems, beautyBrands } from "@/db/schema/beauty";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq, and, isNull, sql, asc } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();

    // Langsung query dari beautyItemUnits sebagai tabel utama
    const unitsWithItems = await db
      .select({
        unit: beautyItemUnits,
        item: beautyItems,
        brand: beautyBrands,
      })
      .from(beautyItemUnits)
      .innerJoin(beautyItems, eq(beautyItemUnits.itemId, beautyItems.id))
      .leftJoin(beautyBrands, eq(beautyBrands.id, beautyItems.brandId))
      .where(
        and(
          eq(beautyItems.householdId, householdId),
          isNull(beautyItems.deletedAt),
          // Hanya ambil status yang masih relevan untuk dicek alert-nya
          sql`${beautyItemUnits.status} IN ('active', 'backup', 'expired')`,
        ),
      )
      .orderBy(asc(beautyItemUnits.expiryDate));

    const today = new Date();
    const currentTime = today.getTime();

    const expiredUnits: any[] = [];
    const expiringSoon: any[] = [];
    const paoWarning: any[] = [];
    const calendarEvents: any[] = [];

    unitsWithItems.forEach(({ unit, item, brand }) => {
      // Struktur data dengan tipe eksplisit agar paoProgress bisa diisi number
      const transformedData = {
        ...item,
        brand,
        unit: {
          ...unit,
          paoProgress: null as number | null, // <-- Perbaikan tipe di sini
          isExpired: false,
          isExpiringSoon: false,
          daysLeft: 0,
        },
      };

      // 1. Kalkulasi Expiry Alert
      if (unit.expiryDate) {
        const expiryDate = new Date(unit.expiryDate);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const isExpired = diffDays < 0;
        const isExpiringSoon = diffDays >= 0 && diffDays <= 30;

        transformedData.unit.isExpired = isExpired;
        transformedData.unit.isExpiringSoon = isExpiringSoon;
        transformedData.unit.daysLeft = diffDays;

        const dateString = isNaN(expiryDate.getTime())
          ? ""
          : expiryDate.toISOString().split("T")[0];

        if (dateString) {
          calendarEvents.push({
            id: unit.id,
            title: `${item.name} (${brand?.name || "No Brand"})`,
            date: dateString,
            type: "expiry",
            daysLeft: diffDays,
          });
        }

        if (isExpired) {
          expiredUnits.push(transformedData);
        } else if (isExpiringSoon) {
          expiringSoon.push(transformedData);
        }
      }

      // 2. Kalkulasi PAO Alert
      if (unit.dateOpened && unit.paoMonths) {
        const openedDate = new Date(unit.dateOpened);
        const paoEndDate = new Date(openedDate);
        paoEndDate.setMonth(paoEndDate.getMonth() + unit.paoMonths);

        const start = openedDate.getTime();
        const end = paoEndDate.getTime();

        let paoProgress = 0;
        if (end > start) {
          paoProgress = Math.min(
            Math.max(((currentTime - start) / (end - start)) * 100, 0),
            100,
          );
        }

        transformedData.unit.paoProgress = Math.round(paoProgress);

        const diffTime = end - currentTime;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const dateString = isNaN(paoEndDate.getTime())
          ? ""
          : paoEndDate.toISOString().split("T")[0];

        if (dateString) {
          calendarEvents.push({
            id: unit.id,
            title: `PAO Habis: ${item.name}`,
            date: dateString,
            type: "pao",
            daysLeft: diffDays,
          });
        }

        if (diffDays <= 14 || paoProgress >= 85) {
          paoWarning.push(transformedData);
        }
      }
    });

    return sendStandardResponse(
      {
        expiredUnits,
        expiringSoon,
        paoWarning,
        calendarEvents,
      },
      "Success fetch beauty alerts",
    );
  } catch (error) {
    return sendStandardResponse(
      null,
      error instanceof Error ? error.message : "Internal Server Error",
      500,
      "error",
    );
  }
}
