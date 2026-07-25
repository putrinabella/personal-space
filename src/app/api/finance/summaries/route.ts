import { db } from "@/db";
import { financeAccounts, financeMonthlySummaries } from "@/db/schema";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { and, eq, isNull, sum } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const currentDate = new Date();
    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : currentDate.getFullYear();
    const month = searchParams.get("month")
      ? Number(searchParams.get("month"))
      : currentDate.getMonth() + 1;

    const summary = await db.query.financeMonthlySummaries.findFirst({
      where: and(
        eq(financeMonthlySummaries.householdId, householdId),
        eq(financeMonthlySummaries.year, year),
        eq(financeMonthlySummaries.month, month),
      ),
    });

    const [accountResult] = await db
      .select({
        totalBalance: sum(financeAccounts.currentBalance),
      })
      .from(financeAccounts)
      .where(
        and(
          eq(financeAccounts.householdId, householdId),
          isNull(financeAccounts.deletedAt),
        ),
      );

    const totalBalanceAllAccounts = Number(accountResult?.totalBalance ?? 0);

    const summaryData = summary
      ? {
          ...summary,
          totalBalance: String(totalBalanceAllAccounts),
        }
      : {
          id: null,
          householdId,
          month,
          year,
          totalIncome: "0.00",
          totalExpense: "0.00",
          totalSavings: "0.00",
          netBalance: "0.00",
          createdAt: null,
          updatedAt: null,
          deletedAt: null,
          totalBalance: String(totalBalanceAllAccounts),
        };

    // Bungkus ke dalam array [ ] agar sesuai dengan ekspektasi hook useBaseAll / SumarriesEntry[]
    return sendStandardResponse(
      [summaryData],
      "Monthly summary retrieved successfully.",
    );
  } catch (error: any) {
    return sendStandardResponse(null, error.message, 500, "error");
  }
}
