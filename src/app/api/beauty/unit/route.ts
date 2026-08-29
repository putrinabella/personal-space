import { db } from "@/db";
import { beautyItems, beautyItemUnits } from "@/db/schema/beauty";
import { sendStandardResponse } from "@/lib/apiResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// GET: Untuk mengambil detail satu unit (berdasarkan ID) atau daftar unit berdasarkan itemId
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const itemId = searchParams.get("itemId");

    // Skenario 1: Ambil detail satu unit spesifik beserta info master product-nya
    if (id) {
      const result = await db
        .select({
          unit: beautyItemUnits,
          item: beautyItems,
        })
        .from(beautyItemUnits)
        .leftJoin(beautyItems, eq(beautyItems.id, beautyItemUnits.itemId))
        .where(eq(beautyItemUnits.id, id));

      if (result.length === 0) {
        return sendStandardResponse(
          null,
          "Beauty item unit not found.",
          404,
          "error",
        );
      }

      const { unit, item } = result[0];

      // Format respons agar menyertakan identitas produk secara langsung
      const formattedResponse = {
        ...unit,
        productName: item ? item.name : "Unknown Product",
      };

      return sendStandardResponse(formattedResponse, "Success");
    }

    // Skenario 2: Ambil semua unit berdasarkan itemId tertentu
    if (itemId) {
      const units = await db
        .select()
        .from(beautyItemUnits)
        .where(eq(beautyItemUnits.itemId, itemId));

      return sendStandardResponse(units, "Success");
    }

    return sendStandardResponse(
      null,
      "Parameter 'id' or 'itemId' is required.",
      400,
      "error",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
// PUT: Untuk mengupdate Unit tertentu saja
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      status,
      price,
      purchaseDate,
      expiryDate,
      dateOpened,
      paoMonths,
    } = body;

    if (!id) {
      return sendStandardResponse(null, "Unit ID is required.", 400, "error");
    }

    const [updatedUnit] = await db
      .update(beautyItemUnits)
      .set({
        status: status || "active",
        price: price ? String(price) : "0",
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        dateOpened: dateOpened ? new Date(dateOpened) : null,
        paoMonths: paoMonths ? Number(paoMonths) : null,
        updatedAt: new Date(),
      })
      .where(eq(beautyItemUnits.id, id))
      .returning();

    if (!updatedUnit) {
      return sendStandardResponse(
        null,
        "Beauty item unit not found.",
        404,
        "error",
      );
    }

    return sendStandardResponse(
      updatedUnit,
      "Beauty item unit updated successfully.",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

// DELETE: Untuk menghapus unit fisik tertentu
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendStandardResponse(null, "Unit ID is required.", 400, "error");
    }

    // Ubah dari db.delete menjadi db.update untuk soft delete
    const [deletedUnit] = await db
      .update(beautyItemUnits)
      .set({ deletedAt: new Date() })
      .where(eq(beautyItemUnits.id, id))
      .returning();

    if (!deletedUnit) {
      return sendStandardResponse(
        null,
        "Beauty item unit not found.",
        404,
        "error",
      );
    }

    return sendStandardResponse(
      deletedUnit,
      "Beauty item unit deleted successfully.",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
