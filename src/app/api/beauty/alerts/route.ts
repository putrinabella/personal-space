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
          sql`${beautyItemUnits.status} IN ('active', 'backup')`,
        ),
      )
      .orderBy(asc(beautyItemUnits.expiryDate));

    const now = new Date();
    // Reset jam ke 00:00:00 untuk akurasi perhitungan hari
    now.setHours(0, 0, 0, 0);

    const expiredUnits: any[] = [];
    const expiringSoon: any[] = [];
    const paoWarning: any[] = [];
    const calendarEvents: any[] = [];

    unitsWithItems.forEach(({ unit, item, brand }) => {
      if (unit.expiryDate) {
        const expDate = new Date(unit.expiryDate);
        expDate.setHours(0, 0, 0, 0);

        const diffTime = expDate.getTime() - now.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        calendarEvents.push({
          id: unit.id,
          title: `${item.name} (${brand?.name || "No Brand"})`,
          date: unit.expiryDate.toISOString().split("T")[0],
          type: "expiry",
          daysLeft: diffDays,
        });

        const unitWithDetails = { ...unit, item, brand, daysLeft: diffDays };

        // KONDISI 1: Jika sudah expired (daysLeft < 0)
        if (diffDays < 0) {
          expiredUnits.push(unitWithDetails);
        }
        // KONDISI 2: Mendekati expired (antara 0 sampai 30 hari ke depan)
        else if (diffDays <= 30) {
          expiringSoon.push(unitWithDetails);
        }
      }

      // Cek PAO (Period After Opening)
      if (unit.dateOpened && unit.paoMonths) {
        const openedDate = new Date(unit.dateOpened);
        const paoEndDate = new Date(openedDate);
        paoEndDate.setMonth(paoEndDate.getMonth() + unit.paoMonths);
        paoEndDate.setHours(0, 0, 0, 0);

        const diffTime = paoEndDate.getTime() - now.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        const totalDuration = paoEndDate.getTime() - openedDate.getTime();
        const elapsed = now.getTime() - openedDate.getTime();
        const progress = Math.min(
          Math.max((elapsed / totalDuration) * 100, 0),
          100,
        );

        calendarEvents.push({
          id: unit.id,
          title: `PAO Habis: ${item.name}`,
          date: paoEndDate.toISOString().split("T")[0],
          type: "pao",
          daysLeft: diffDays,
        });

        if (diffDays <= 14 || progress >= 85) {
          paoWarning.push({
            ...unit,
            item,
            brand,
            progress: Math.round(progress),
            daysLeft: diffDays,
          });
        }
      }
    });

    return sendStandardResponse(
      {
        expiredUnits, // <-- Kelompok yang sudah lewat tanggal expired-nya
        expiringSoon, // <-- Kelompok yang masih akan expired (0-30 hari)
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
