// app/api/finance/transfers/route.ts
import { NextRequest } from "next/server";
import { db } from "@/db";
import { pocketTransfers } from "@/db/schema/finance";
import { eq } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return sendStandardResponse(null, "Unauthorized", 401, "error");

  const { fromPocketId, toPocketId, amount } = await request.json();

  // Tips: Gunakan db.transaction jika ingin memotong saldo from
  // dan menambah saldo to dalam satu operasi atomik
  const [newTransfer] = await db
    .insert(pocketTransfers)
    .values({
      userId: user.id,
      fromPocketId,
      toPocketId,
      amount,
    })
    .returning();

  return sendStandardResponse(newTransfer, "Transfer berhasil.", 201);
}
