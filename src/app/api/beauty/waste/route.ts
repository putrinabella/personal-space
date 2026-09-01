import { NextRequest } from "next/server";
import { db } from "@/db"; // Sesuaikan path Drizzle DB Anda
import {
  beautyWasteHistory,
  beautyItemUnits,
  beautyItems,
  beautyBrands,
} from "@/db/schema/beauty"; // Sesuaikan path schema Anda
import { eq, and } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createCrudHandler } from "@/lib/server/crud/createCrudHandler";

async function getHandler() {
  const { householdId } = await getHouseholdAuth();
  return createCrudHandler({
    table: beautyWasteHistory,
    entity: "Waste History",

    searchableColumns: [beautyWasteHistory.name],
    filterableColumns: ["type"],
    defaultWhere: eq(beautyWasteHistory.householdId, householdId),
  });
}
export async function GET(req: Request) {
  return (await getHandler()).GET(req);
}
export async function POST(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const body = await request.json();
    const { unitId } = body;

    if (!unitId) {
      return sendStandardResponse(null, "Unit ID is required.", 400, "error");
    }

    const result = await db.transaction(async (tx) => {
      // Ambil data unit, item, dan brand terkait
      const [unitData] = await tx
        .select({
          unitId: beautyItemUnits.id,
          price: beautyItemUnits.price,
          expiryDate: beautyItemUnits.expiryDate,
          itemName: beautyItems.name,
          itemId: beautyItems.id,
          brandId: beautyBrands.id,
          brandName: beautyBrands.name,
          householdId: beautyItems.householdId,
        })
        .from(beautyItemUnits)
        .innerJoin(beautyItems, eq(beautyItemUnits.itemId, beautyItems.id))
        .innerJoin(beautyBrands, eq(beautyItems.brandId, beautyBrands.id))
        .where(
          and(
            eq(beautyItemUnits.id, unitId),
            eq(beautyItems.householdId, householdId),
          ),
        );

      if (!unitData) {
        throw new Error("Beauty unit item not found.");
      }

      // Masukkan ke tabel beauty_waste_history
      const [newWaste] = await tx
        .insert(beautyWasteHistory)
        .values({
          householdId,
          itemId: unitData.itemId,
          brandId: unitData.brandId,
          brandNameSnapshot: unitData.brandName,
          name: unitData.itemName,
          price: unitData.price,
          expiredDate: unitData.expiryDate
            ? unitData.expiryDate.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        })
        .returning();

      // Ubah status unit menjadi 'discarded' atau hapus unit fisik dari inventory aktif
      await tx
        .update(beautyItemUnits)
        .set({ status: "discarded", updatedAt: new Date() })
        .where(eq(beautyItemUnits.id, unitId));

      return newWaste;
    });

    return sendStandardResponse(
      result,
      "Item successfully moved to waste history.",
      201,
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
