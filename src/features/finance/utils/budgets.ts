import { db } from "@/db";
import {
  financeBudgets,
  financeCategories,
  financeTransactions,
} from "@/db/schema/finance";
import { and, eq, gte, lte, sql } from "drizzle-orm";
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
