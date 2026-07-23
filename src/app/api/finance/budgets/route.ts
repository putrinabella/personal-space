import { db } from "@/db";
import { financeBudgets, financeTransactions } from "@/db/schema/finance";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";
import { and, eq, gte, lte, sql } from "drizzle-orm";

const getHandler = () =>
  createFinanceHandler({
    table: financeBudgets,
    entity: "Budgets",
    // searchableColumns: [financeBudgets.name],
  });

export async function GET(req: Request) {
  return (await getHandler()).GET(req);
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

export async function getBudgetsWithProgress(
  householdId: string,
  month: number,
  year: number,
) {
  // 1. Ambil semua budget untuk bulan & tahun tertentu
  const budgets = await db.query.financeBudgets.findMany({
    where: and(
      eq(financeBudgets.householdId, householdId),
      eq(financeBudgets.month, month),
      eq(financeBudgets.year, year),
    ),
    with: {
      category: true, // Untuk ambil nama/ikon kategori
    },
  });

  // 2. Hitung total pengeluaran aktual per kategori pada bulan & tahun tersebut
  // Tanggal awal dan akhir bulan
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const results = await Promise.all(
    budgets.map(async (budget) => {
      const spentResult = await db
        .select({
          totalSpent: sql`sum(${financeTransactions.amount})`,
        })
        .from(financeTransactions)
        .where(
          and(
            eq(financeTransactions.householdId, householdId),
            eq(financeTransactions.categoryId, budget.categoryId),
            eq(financeTransactions.type, "expense"), // Hanya hitung pengeluaran
            gte(financeTransactions.date, startDate),
            lte(financeTransactions.date, endDate),
          ),
        );

      const totalSpent = Number(spentResult[0]?.totalSpent || 0);
      const budgetAmount = Number(budget.amount);
      const remaining = budgetAmount - totalSpent;
      const percentage =
        budgetAmount > 0 ? (totalSpent / budgetAmount) * 100 : 0;

      return {
        ...budget,
        totalSpent,
        remaining,
        percentage,
      };
    }),
  );

  return results;
}
