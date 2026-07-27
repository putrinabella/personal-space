import { db } from "@/db";
import {
  financeBudgets,
  financeCategories,
  financeTransactions,
} from "@/db/schema/finance";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";
import { and, eq, gte, lte, sql } from "drizzle-orm";
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

    // Fallback ke handler GET standar jika parameter bulan/tahun tidak lengkap
    return (await getHandler()).GET(req);
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}

export async function getBudgetsWithProgress(
  householdId: string,
  month: number,
  year: number,
) {
  // 1. Ambil data budget beserta join ke tabel category (menggunakan pola yang sama seperti transaksi)
  const budgetsWithCategory = await db
    .select({
      id: financeBudgets.id,
      householdId: financeBudgets.householdId,
      categoryId: financeBudgets.categoryId,
      amount: financeBudgets.amount,
      month: financeBudgets.month,
      year: financeBudgets.year,
      createdAt: financeBudgets.createdAt,
      updatedAt: financeBudgets.updatedAt,
      deletedAt: financeBudgets.deletedAt,
      category: financeCategories, // Langsung ambil objek category via leftJoin
    })
    .from(financeBudgets)
    .leftJoin(
      financeCategories,
      eq(financeCategories.id, financeBudgets.categoryId),
    )
    .where(
      and(
        eq(financeBudgets.householdId, householdId),
        eq(financeBudgets.month, month),
        eq(financeBudgets.year, year),
      ),
    );

  // 2. Tanggal awal dan akhir bulan untuk kalkulasi pengeluaran
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  // 3. Hitung total spent per budget
  const results = await Promise.all(
    budgetsWithCategory.map(async (budgetRow) => {
      const spentResult = await db
        .select({
          totalSpent: sql`sum(${financeTransactions.amount})`,
        })
        .from(financeTransactions)
        .where(
          and(
            eq(financeTransactions.householdId, householdId),
            eq(financeTransactions.categoryId, budgetRow.categoryId),
            eq(financeTransactions.type, "expense"),
            gte(financeTransactions.date, startDate),
            lte(financeTransactions.date, endDate),
          ),
        );

      const totalSpent = Number(spentResult[0]?.totalSpent || 0);
      const budgetAmount = Number(budgetRow.amount);
      const remaining = budgetAmount - totalSpent;
      const percentage =
        budgetAmount > 0 ? (totalSpent / budgetAmount) * 100 : 0;

      return {
        ...budgetRow,
        totalSpent,
        remaining,
        percentage,
      };
    }),
  );

  return results;
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
