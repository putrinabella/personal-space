import { financeBudgets } from "@/db/schema/finance";
import { getBudgetsWithProgress } from "@/features/finance/utils/budgets";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";
import { NextRequest } from "next/server";

const getHandler = () =>
  createFinanceHandler({
    table: financeBudgets,
    entity: "Budgets",
  });

export async function GET(req: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(req.url);

    const monthStr = searchParams.get("month");
    const yearStr = searchParams.get("year");

    // Jika frontend meminta budget beserta kalkulasi progress pengeluarannya
    if (monthStr && yearStr) {
      const month = Number(monthStr);
      const year = Number(yearStr);

      const budgetsWithProgress = await getBudgetsWithProgress(
        householdId,
        month,
        year,
      );

      return sendStandardResponse(
        budgetsWithProgress,
        "Budgets with progress retrieved successfully.",
      );
    }
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}

export async function POST(req: Request) {
  return (await getHandler()).POST(req);
}

export async function PUT(req: Request) {
  return (await getHandler()).PUT(req);
}

export async function DELETE(req: Request) {
  return (await getHandler()).DELETE(req);
}
