import { db } from "@/db";
import { beautyItems, beautyItemUnits } from "@/db/schema/beauty";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq, and, inArray, isNull, asc } from "drizzle-orm";
import { NextRequest } from "next/server";

// GET: Mencari produk berdasarkan barcode dan mengambil unit aktif/backup untuk popup konfirmasi
export async function GET(req: NextRequest) {
  try {
    // 1. Ambil householdId secara aman dari helper auth
    const { householdId } = await getHouseholdAuth();

    const { searchParams } = new URL(req.url);
    const barcode = searchParams.get("barcode");

    if (!barcode) {
      return sendStandardResponse(
        null,
        "Parameter 'barcode' is required.",
        400,
        "error",
      );
    }

    // 2. Cari master item berdasarkan barcode dan householdId yang aktif
    const itemResult = await db.query.beautyItems.findFirst({
      where: and(
        eq(beautyItems.householdId, householdId),
        eq(beautyItems.barcode, barcode),
        isNull(beautyItems.deletedAt),
      ),
      with: {
        brand: true,
        category: true,
        // 3. Ambil unit fisik yang statusnya masih aktif atau backup (diurutkan FIFO berdasarkan expiryDate)
        units: {
          where: and(
            inArray(beautyItemUnits.status, ["active", "backup"]),
            isNull(beautyItemUnits.deletedAt),
          ),
          orderBy: [asc(beautyItemUnits.expiryDate)],
        },
      },
    });

    // Jika barcode belum terdaftar dalam household ini
    if (!itemResult) {
      return sendStandardResponse(
        null,
        "Barcode not found. Please register this product first.",
        404,
        "error",
      );
    }

    // 4. Format respons untuk kebutuhan Interactive Popup di frontend
    const formattedData = {
      item: {
        id: itemResult.id,
        name: itemResult.name,
        brandName: itemResult.brand?.name || "Unknown Brand",
        minStock: itemResult.minStock,
        notes: itemResult.notes,
      },
      activeUnits: itemResult.units.map((unit) => ({
        id: unit.id,
        status: unit.status,
        price: unit.price,
        purchaseDate: unit.purchaseDate,
        expiryDate: unit.expiryDate,
        dateOpened: unit.dateOpened,
        paoMonths: unit.paoMonths,
      })),
    };

    return sendStandardResponse(formattedData, "Barcode scanned successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
