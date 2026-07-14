import { NextRequest } from "next/server";
import { db } from "@/db";
import { pockets } from "@/db/schema/finance"; // Sesuaikan path import schema Anda
import { eq, sql, desc, and } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { validate as validateUuid } from "uuid";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return sendStandardResponse(null, "Unauthorized", 401, "error");
    }

    const userId = user.id;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      if (!validateUuid(id)) {
        return sendStandardResponse(
          null,
          "Format ID Pocket tidak valid.",
          400,
          "error",
        );
      }
      const item = await db.query.pockets.findFirst({
        where: and(eq(pockets.id, id), eq(pockets.userId, userId)),
        with: { transactions: true },
      });
      return item
        ? sendStandardResponse(item, "Detail pocket ditemukan.")
        : sendStandardResponse(null, "Pocket tidak ditemukan.", 404, "error");
    }
    if (!searchParams.has("page")) {
      const data = await db.query.pockets.findMany({
        where: eq(pockets.userId, userId),
        orderBy: [desc(pockets.createdAt)],
      });
      return sendStandardResponse(data, "Berhasil mengambil daftar pocket.");
    }
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    const [totalQuery, items] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(pockets)
        .where(eq(pockets.userId, userId)),
      db.query.pockets.findMany({
        where: eq(pockets.userId, userId),
        limit: perPage,
        offset: offset,
        orderBy: [desc(pockets.createdAt)],
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: items,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: "Berhasil mengambil daftar pocket ber-pagination.",
    });
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
export async function POST(request: NextRequest) {
  try {
    const userId = "USER_ID_DARI_SESSION"; // Ganti dengan logic auth Anda
    const body = await request.json();
    const {
      name,
      type,
      balance,
      isAutoAllocationActive,
      monthlyAllocationAmount,
      allocationDay,
    } = body;

    const [newPocket] = await db
      .insert(pockets)
      .values({
        userId,
        name,
        type,
        balance: balance || "0",
        isAutoAllocationActive: !!isAutoAllocationActive,
        monthlyAllocationAmount,
        allocationDay,
      })
      .returning();

    return sendStandardResponse(newPocket, "Pocket baru berhasil dibuat.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
export async function PUT(request: NextRequest) {
  try {
    const userId = "USER_ID_DARI_SESSION"; // Ganti dengan logic auth Anda
    const {
      id,
      name,
      balance,
      isAutoAllocationActive,
      monthlyAllocationAmount,
      allocationDay,
    } = await request.json();

    if (!id)
      return sendStandardResponse(null, "ID pocket diperlukan.", 400, "error");

    const [updated] = await db
      .update(pockets)
      .set({
        name,
        balance,
        isAutoAllocationActive,
        monthlyAllocationAmount,
        allocationDay,
        updatedAt: new Date(),
      })
      .where(and(eq(pockets.id, id), eq(pockets.userId, userId)))
      .returning();

    return updated
      ? sendStandardResponse(updated, "Pocket berhasil diperbarui.")
      : sendStandardResponse(
          null,
          "Pocket tidak ditemukan atau akses ditolak.",
          404,
          "error",
        );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
