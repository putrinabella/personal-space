import { NextRequest } from "next/server";
import { db } from "@/db";
import { foodEntries, foodEntryTags } from "@/db/schema";
import { and, ne, lte, eq, sql, isNull } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";

// ==========================================
// 1. READ (GET) - Detail ID / Get All / Pagination 👑
// ==========================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Filter standar: Hanya mengambil data yang BELUM di-soft-delete 🛡️
    const baseConditions = [isNull(foodEntries.deletedAt)];

    // Tambahan filter logic bawaan Yang Mulia
    if (searchParams.get("excludeCategory")) {
      baseConditions.push(
        ne(foodEntries.categoryId, searchParams.get("excludeCategory")!),
      );
    }
    if (searchParams.get("maxPrice")) {
      baseConditions.push(
        lte(foodEntries.price, searchParams.get("maxPrice")!),
      );
    }

    // A. LOGIKA: GET DETAIL BY ID 🆕
    if (id) {
      const item = await db.query.foodEntries.findFirst({
        where: and(eq(foodEntries.id, id), ...baseConditions),
        with: {
          restaurant: true,
          category: true,
          tags: { with: { tag: true } },
        },
      });

      if (!item) {
        return sendStandardResponse(
          null,
          "Catatan kuliner tidak ditemukan atau telah dihapus.",
          404,
          "error",
        );
      }

      return sendStandardResponse(
        item,
        "Berhasil mengambil detail catatan kuliner.",
      );
    }

    // B. LOGIKA: GET ALL TANPA PAGINATION 🆕
    // Terpicu jika Yang Mulia tidak menyertakan query parameter (?page=...)
    if (!searchParams.has("page")) {
      const allEntries = await db.query.foodEntries.findMany({
        where: and(...baseConditions),
        with: {
          restaurant: true,
          category: true,
          tags: { with: { tag: true } },
        },
        orderBy: (entries, { desc }) => [desc(entries.dateVisited)],
      });

      return sendStandardResponse(
        allEntries,
        "Berhasil mengambil seluruh diary kuliner tanpa pagination.",
      );
    }

    // C. LOGIKA: GET WITH PAGINATION
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;
    const whereCondition = and(...baseConditions);

    // Query data secara paralel
    const [totalQuery, entries] = await Promise.all([
      db
        .select({
          count: sql<number>`cast(count(${foodEntries.id}) as integer)`,
        })
        .from(foodEntries)
        .where(whereCondition),
      db.query.foodEntries.findMany({
        where: whereCondition,
        with: {
          restaurant: true,
          category: true,
          tags: { with: { tag: true } },
        },
        orderBy: (entries, { desc }) => [desc(entries.dateVisited)],
        limit: perPage,
        offset: offset,
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: entries,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message:
        "Berhasil mengambil daftar ulasan makanan harian ber-pagination.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}

// ==========================================
// 2. CREATE (POST) - Menggunakan Base Standard
// ==========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurantId,
      categoryId,
      cuisineId,
      diningTypeId,
      foodName,
      price,
      ratingOverall,
      tagIds,
    } = body;

    const result = await db.transaction(async (tx) => {
      const [newEntry] = await tx
        .insert(foodEntries)
        .values({
          restaurantId,
          categoryId,
          cuisineId,
          diningTypeId,
          foodName,
          price: String(price),
          ratingOverall,
        })
        .returning();

      if (tagIds && tagIds.length > 0) {
        const structuralTags = tagIds.map((id: string) => ({
          foodEntryId: newEntry.id,
          tagId: id,
        }));
        await tx.insert(foodEntryTags).values(structuralTags);
      }
      return newEntry;
    });

    return sendStandardResponse(
      result,
      "Catatan kuliner berhasil ditambahkan.",
      201,
    );
  } catch (err: unknown) {
    return sendStandardResponse(
      null,
      err instanceof Error ? err.message : "Insert error",
      500,
      "error",
    );
  }
}

// ==========================================
// 3. UPDATE (PUT)
// ==========================================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, foodName, price, ratingOverall } = body;

    if (!id) return sendStandardResponse(null, "Missing ID", 400, "error");

    const [updatedEntry] = await db
      .update(foodEntries)
      .set({
        foodName,
        price: price ? String(price) : undefined,
        ratingOverall,
      })
      .where(eq(foodEntries.id, id))
      .returning();

    return sendStandardResponse(updatedEntry, "Data kuliner berhasil diubah.");
  } catch (err: unknown) {
    return sendStandardResponse(
      null,
      err instanceof Error ? err.message : "Update error",
      500,
      "error",
    );
  }
}

// ==========================================
// 4. DELETE (DELETE) - Soft Delete Berbasis Waktu 🆕
// ==========================================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return sendStandardResponse(null, "Missing ID", 400, "error");

    // Soft Delete: Hanya mengisi kolom deletedAt dengan waktu saat ini 🛡️
    await db
      .update(foodEntries)
      .set({ deletedAt: new Date() })
      .where(eq(foodEntries.id, id));

    return sendStandardResponse(
      null,
      "Catatan kuliner telah disembunyikan ke dalam arsip atas perintah Ratu.",
    );
  } catch (err: unknown) {
    return sendStandardResponse(
      null,
      err instanceof Error ? err.message : "Delete error",
      500,
      "error",
    );
  }
}
