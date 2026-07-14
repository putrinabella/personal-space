import { NextRequest } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema/finance";
import { eq, and, desc, sql } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { validate as validateUuid } from "uuid";
export async function POST(request: NextRequest) {
  try {
    const { householdId, userId } = await getHouseholdAuth();
    const body = await request.json();

    const [newTx] = await db
      .insert(transactions)
      .values({
        ...body,
        householdId,
        createdById: userId, // Menyimpan siapa user yang menginput
      })
      .returning();

    return sendStandardResponse(newTx, "Transaksi berhasil dicatat.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 401);
  }
}

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
      const item = await db.query.transactions.findFirst({
        where: and(
          eq(transactions.id, id),
          eq(transactions.householdId, householdId),
        ),
        with: { pocket: true, category: true },
      });
      return item
        ? sendStandardResponse(item, "Detail transaksi ditemukan.")
        : sendStandardResponse(
            null,
            "Transaksi tidak ditemukan.",
            404,
            "error",
          );
    }

    // 2. GET ALL (Tanpa pagination)
    if (!searchParams.has("page")) {
      const data = await db.query.transactions.findMany({
        where: eq(transactions.householdId, householdId),
        with: { pocket: true, category: true },
        orderBy: [desc(transactions.date)],
      });
      return sendStandardResponse(data, "Berhasil mengambil daftar transaksi.");
    }

    // 3. GET PAGINATED
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    const [totalQuery, items] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(transactions)
        .where(eq(transactions.householdId, householdId)),
      db.query.transactions.findMany({
        where: eq(transactions.householdId, householdId),
        with: { pocket: true, category: true },
        limit: perPage,
        offset: offset,
        orderBy: [desc(transactions.date)],
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: items,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: "Berhasil mengambil daftar transaksi ber-pagination.",
    });
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
