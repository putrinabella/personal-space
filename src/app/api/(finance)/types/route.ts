import { NextRequest } from "next/server";
import { db } from "@/db";
import { types } from "@/db/schema/finance";
import { eq, and, desc, sql } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { validate as validateUuid } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // 1. GET DETAIL BY ID
    if (id) {
      if (!validateUuid(id)) {
        return sendStandardResponse(
          null,
          "Format ID tidak valid.",
          400,
          "error",
        );
      }
      const item = await db.query.types.findFirst({
        where: and(eq(types.id, id), eq(types.householdId, householdId)),
      });
      return item
        ? sendStandardResponse(item, "Detail kategori ditemukan.")
        : sendStandardResponse(null, "Kategori tidak ditemukan.", 404, "error");
    }

    // 2. GET ALL
    if (!searchParams.has("page")) {
      const data = await db.query.types.findMany({
        where: eq(types.householdId, householdId),
        orderBy: [desc(types.createdAt)],
      });
      return sendStandardResponse(data, "Berhasil mengambil daftar kategori.");
    }

    // 3. GET PAGINATED
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    const [totalQuery, items] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(types)
        .where(eq(types.householdId, householdId)),
      db.query.types.findMany({
        where: eq(types.householdId, householdId),
        limit: perPage,
        offset: offset,
        orderBy: [desc(types.createdAt)],
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: items,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: "Berhasil mengambil kategori ber-pagination.",
    });
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { householdId, userId } = await getHouseholdAuth();
    const { name, type, iconSlug } = await request.json();

    const [newType] = await db
      .insert(types)
      .values({ householdId, name, type, iconSlug })
      .returning();

    return sendStandardResponse(newType, "Kategori berhasil dibuat.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 401);
  }
}
