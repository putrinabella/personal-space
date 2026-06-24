import { NextRequest } from "next/server";
import { db } from "@/db";
import {
  categories,
  cuisines,
  diningTypes,
  tags,
  restaurants,
} from "@/db/schema";
import { sql, and, eq, AnyColumn, isNull } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";

// Helper internal untuk memetakan parameter string URL [type] ke objek tabel Drizzle asli
function getTableSchema(type: string) {
  switch (type) {
    case "categories":
      return { table: categories, label: "Kategori" };
    case "cuisines":
      return { table: cuisines, label: "Cuisine" };
    case "diningTypes":
      return { table: diningTypes, label: "Tipe Dining" };
    case "tags":
      return { table: tags, label: "Tag" };
    case "restaurants":
      return { table: restaurants, label: "Restoran" };
    default:
      return null;
  }
}

// ==========================================
// 1. READ (GET): Detail ID / Get All / Pagination
// ==========================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;
    const target = getTableSchema(type);

    if (!target) {
      return sendStandardResponse(
        null,
        `Endpoint /api/food/${type} tidak ditemukan`,
        404,
        "error",
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Jembatan Type-Safe melewati 'unknown' demi membungkam eror TypeScript
    const tableFields = target.table as unknown as {
      id: AnyColumn;
      deletedAt: AnyColumn;
    };

    // 🛡️ FILTER UTAMA: Hanya ambil data yang BELUM di-soft-delete (deletedAt IS NULL)
    const baseCondition = isNull(tableFields.deletedAt);

    // A. LOGIKA: GET DETAIL BY ID
    if (id) {
      const [item] = await db
        .select()
        .from(target.table)
        .where(and(eq(tableFields.id, id), baseCondition))
        .limit(1);

      if (!item) {
        return sendStandardResponse(
          null,
          `Data ${target.label} dengan ID tersebut tidak ditemukan atau telah di-soft-delete`,
          404,
          "error",
        );
      }

      return sendStandardResponse(
        item,
        `Berhasil mengambil detail ${target.label}.`,
      );
    }

    // B. LOGIKA: GET ALL TANPA PAGINATION (Jika tidak ada query parameter 'page')
    if (!searchParams.has("page")) {
      const allItems = await db
        .select()
        .from(target.table)
        .where(baseCondition);

      return sendStandardResponse(
        allItems,
        `Berhasil mengambil seluruh daftar ${target.label} tanpa pagination.`,
      );
    }

    // C. LOGIKA: GET WITH PAGINATION
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    const [totalQuery, items] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(target.table)
        .where(baseCondition),
      db
        .select()
        .from(target.table)
        .where(baseCondition)
        .limit(perPage)
        .offset(offset),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: items,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: `Berhasil mengambil daftar ${target.label} ber-pagination.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}

// ==========================================
// 2. CREATE (POST): Tambah opsi data baru
// ==========================================
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;
    const target = getTableSchema(type);

    if (!target) {
      return sendStandardResponse(
        null,
        `Endpoint /api/food/${type} tidak ditemukan`,
        404,
        "error",
      );
    }

    const body = await request.json();
    const [newItem] = await db.insert(target.table).values(body).returning();

    return sendStandardResponse(
      newItem,
      `${target.label} baru berhasil ditambahkan!`,
      201,
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Insert error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}

// ==========================================
// 3. UPDATE (PUT): Edit opsi data berdasarkan ID
// ==========================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;
    const target = getTableSchema(type);

    if (!target) {
      return sendStandardResponse(
        null,
        `Endpoint /api/food/${type} tidak ditemukan`,
        404,
        "error",
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return sendStandardResponse(
        null,
        "ID data wajib disertakan untuk melakukan pembaruan",
        400,
        "error",
      );
    }

    const tableWithId = target.table as unknown as { id: AnyColumn };

    const [updatedItem] = await db
      .update(target.table)
      .set(updateData)
      .where(eq(tableWithId.id, id))
      .returning();

    return sendStandardResponse(
      updatedItem,
      `Data ${target.label} berhasil diperbarui.`,
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}

// ==========================================
// 4. DELETE (DELETE): Hapus data lewat URL Query (?id=UUID)
// ==========================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;
    const target = getTableSchema(type);

    if (!target) {
      return sendStandardResponse(
        null,
        `Endpoint /api/food/${type} tidak ditemukan`,
        404,
        "error",
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendStandardResponse(
        null,
        "Spesifik ID wajib dicantumkan pada query parameter URL",
        400,
        "error",
      );
    }

    // Ambil field secara aman dari deteksi ketat TypeScript
    const tableFields = target.table as unknown as {
      id: AnyColumn;
      deletedAt: AnyColumn;
    };

    // 🛡️ Mengubah data permanen menjadi pembaruan stamp waktu saat ini
    await db
      .update(target.table)
      .set({ deletedAt: new Date() })
      .where(eq(tableFields.id, id));

    return sendStandardResponse(
      null,
      `Data ${target.label} berhasil disembunyikan ke dalam arsip kerajaan atas perintah Ratu.`,
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}
