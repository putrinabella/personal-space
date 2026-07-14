// app/api/finance/transactions/route.ts
import { NextRequest } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema/finance";
import { eq, and, desc } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return sendStandardResponse(null, "Unauthorized", 401, "error");

  const body = await request.json();
  // Validasi: Pastikan pocketId milik user yang login
  const [newTx] = await db
    .insert(transactions)
    .values({
      ...body,
      userId: user.id,
    })
    .returning();

  return sendStandardResponse(newTx, "Transaksi berhasil dicatat.", 201);
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return sendStandardResponse(null, "Unauthorized", 401, "error");

  const data = await db.query.transactions.findMany({
    where: eq(transactions.userId, user.id),
    with: { pocket: true, category: true },
    orderBy: [desc(transactions.date)],
  });
  return sendStandardResponse(data, "Daftar transaksi diambil.");
}
