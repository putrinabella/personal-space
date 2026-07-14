import { NextRequest } from "next/server";
import { db } from "@/db";
import { pocketTransfers } from "@/db/schema/finance";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";

export async function POST(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { fromPocketId, toPocketId, amount } = await request.json();

    const [newTransfer] = await db
      .insert(pocketTransfers)
      .values({
        householdId,
        fromPocketId,
        toPocketId,
        amount,
      })
      .returning();

    return sendStandardResponse(newTransfer, "Transfer berhasil.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 401);
  }
}
