import { db } from "@/db";
import { financePockets, financeSavingGoals } from "@/db/schema/finance";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { NextRequest } from "next/server";
import { and, eq, ilike, or } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const filters = [];

    filters.push(eq(financePockets.householdId, householdId));

    if (searchParams.get("pocketId")) {
      filters.push(
        eq(financeSavingGoals.pocketId, searchParams.get("pocketId")!),
      );
    }

    if (searchParams.has("isCompleted")) {
      filters.push(
        eq(
          financeSavingGoals.isCompleted,
          searchParams.get("isCompleted") === "true",
        ),
      );
    }

    if (searchParams.get("search")) {
      const searchTerm = `%${searchParams.get("search")}%`;
      filters.push(
        or(
          ilike(financeSavingGoals.name, searchTerm),
          ilike(financeSavingGoals.description, searchTerm),
        )!,
      );
    }

    const goals = await db
      .select({
        id: financeSavingGoals.id,
        name: financeSavingGoals.name,
        description: financeSavingGoals.description,
        targetAmount: financeSavingGoals.targetAmount,
        targetDate: financeSavingGoals.targetDate,
        isCompleted: financeSavingGoals.isCompleted,
        pocketId: financeSavingGoals.pocketId,
        createdAt: financeSavingGoals.createdAt,
        updatedAt: financeSavingGoals.updatedAt,
        pocket: financePockets,
      })
      .from(financeSavingGoals)
      .innerJoin(
        financePockets,
        eq(financeSavingGoals.pocketId, financePockets.id),
      )
      .where(and(...filters));

    return sendStandardResponse(goals, "Saving goals retrieved successfully.");
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const body = await request.json();
    const { name, description, pocketId, targetAmount, targetDate } = body;

    const pocket = await db.query.financePockets.findFirst({
      where: and(
        eq(financePockets.id, pocketId),
        eq(financePockets.householdId, householdId),
      ),
    });

    if (!pocket) {
      return sendStandardResponse(
        null,
        "Invalid pocket or unauthorized.",
        400,
        "error",
      );
    }

    const [newGoal] = await db
      .insert(financeSavingGoals)
      .values({
        name,
        description,
        pocketId,
        targetAmount,
        targetDate,
      })
      .returning();

    return sendStandardResponse(
      newGoal,
      "Saving goal created successfully.",
      201,
    );
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}
