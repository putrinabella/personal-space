import { db } from "@/db";
import {
  financeAccounts,
  financeCategories,
  financeMonthlySummaries,
  financePockets,
  financeTransactions,
} from "@/db/schema";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";
import {
  eq,
  ilike,
  isNull,
  sql,
  and,
  desc,
  count,
  gte,
  lte,
} from "drizzle-orm";
import { NextRequest } from "next/server";

const h = async () =>
  await createFinanceHandler({
    table: financeTransactions,
    entity: "Transaction",
  });

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const page = Number(searchParams.get("page"));
    const perPage = Number(searchParams.get("per_page") ?? 15);
    const search = searchParams.get("search");

    const month = searchParams.get("month");
    const accountId = searchParams.get("accountId");
    const pocketId = searchParams.get("pocketId");
    const categoryId = searchParams.get("categoryId");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const filters = [eq(financeTransactions.householdId, householdId)];
    filters.push(isNull(financeTransactions.deletedAt));

    if (id) {
      filters.push(eq(financeTransactions.id, id));
    }

    if (search) {
      filters.push(ilike(financeTransactions.description, `%${search}%`));
    }

    if (accountId) {
      filters.push(eq(financeTransactions.accountId, accountId));
    }

    if (pocketId) {
      filters.push(eq(financeTransactions.pocketId, pocketId));
    }

    if (categoryId) {
      filters.push(eq(financeTransactions.categoryId, categoryId));
    }

    if (type) {
      filters.push(eq(financeTransactions.type, type as any));
    }

    if (status) {
      filters.push(eq(financeTransactions.status, status as any));
    }

    if (month) {
      const startDate = `${month}-01T00:00:00.000Z`;
      const [year, mon] = month.split("-").map(Number);
      const lastDay = new Date(year, mon, 0).getDate();
      const endDate = `${month}-${lastDay}T23:59:59.999Z`;

      filters.push(
        gte(financeTransactions.date, new Date(startDate) as any),
        lte(financeTransactions.date, new Date(endDate) as any),
      );
    }

    const queryBase = db
      .select({
        id: financeTransactions.id,
        householdId: financeTransactions.householdId,
        accountId: financeTransactions.accountId,
        pocketId: financeTransactions.pocketId,
        categoryId: financeTransactions.categoryId,
        createdById: financeTransactions.createdById,
        amount: financeTransactions.amount,
        type: financeTransactions.type,
        status: financeTransactions.status,
        description: financeTransactions.description,
        date: financeTransactions.date,
        createdAt: financeTransactions.createdAt,
        updatedAt: financeTransactions.updatedAt,
        deletedAt: financeTransactions.deletedAt,
        account: financeAccounts,
        pocket: financePockets,
        category: financeCategories,
      })
      .from(financeTransactions)
      .leftJoin(
        financeAccounts,
        eq(financeAccounts.id, financeTransactions.accountId),
      )
      .leftJoin(
        financePockets,
        eq(financePockets.id, financeTransactions.pocketId),
      )
      .leftJoin(
        financeCategories,
        eq(financeCategories.id, financeTransactions.categoryId),
      )
      .where(and(...filters))
      .orderBy(desc(financeTransactions.date));

    if (id) {
      const [item] = await queryBase.limit(1);

      if (!item) {
        return sendStandardResponse(
          null,
          "Transaction not found.",
          404,
          "error",
        );
      }

      return sendStandardResponse(item, "Transaction retrieved successfully.");
    }

    if (!page) {
      const items = await queryBase;
      return sendStandardResponse(
        items,
        "Transaction list retrieved successfully.",
      );
    }

    const offset = (page - 1) * perPage;

    const [items, total] = await Promise.all([
      db
        .select({
          id: financeTransactions.id,
          householdId: financeTransactions.householdId,
          accountId: financeTransactions.accountId,
          pocketId: financeTransactions.pocketId,
          categoryId: financeTransactions.categoryId,
          createdById: financeTransactions.createdById,
          amount: financeTransactions.amount,
          type: financeTransactions.type,
          status: financeTransactions.status,
          description: financeTransactions.description,
          date: financeTransactions.date,
          createdAt: financeTransactions.createdAt,
          updatedAt: financeTransactions.updatedAt,
          deletedAt: financeTransactions.deletedAt,
          account: financeAccounts,
          pocket: financePockets,
          category: financeCategories,
        })
        .from(financeTransactions)
        .leftJoin(
          financeAccounts,
          eq(financeAccounts.id, financeTransactions.accountId),
        )
        .leftJoin(
          financePockets,
          eq(financePockets.id, financeTransactions.pocketId),
        )
        .leftJoin(
          financeCategories,
          eq(financeCategories.id, financeTransactions.categoryId),
        )
        .where(and(...filters))
        .orderBy(desc(financeTransactions.date))
        .limit(perPage)
        .offset(offset),

      db
        .select({ count: count() })
        .from(financeTransactions)
        .where(and(...filters)),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items,
      totalItems: total[0]?.count ?? 0,
      page,
      perPage,
      message: "Transaction list retrieved successfully.",
    });
  } catch (error) {
    return sendStandardResponse(
      null,
      error instanceof Error ? error.message : "Internal Server Error",
      500,
      "error",
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { householdId, userId } = await getHouseholdAuth();
    const body = await request.json();
    const {
      accountId,
      categoryId,
      amount,
      type,
      description,
      pocketId,
      date,
      status,
    } = body;

    const transactionStatus = status || "completed";
    const numericAmount = Number(amount);
    const transactionDate = date ? new Date(date) : new Date();
    const result = await db.transaction(async (tx) => {
      const [newTransaction] = await tx
        .insert(financeTransactions)
        .values({
          householdId,
          accountId,
          pocketId: pocketId || null,
          categoryId,
          amount: String(numericAmount),
          type,
          status: transactionStatus,
          description,
          date: date ? new Date(date) : new Date(),
          createdById: userId,
        })
        .returning();

      if (transactionStatus !== "cancelled") {
        const adjustment = type === "income" ? numericAmount : -numericAmount;

        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${adjustment}::numeric`,
          })
          .where(eq(financeAccounts.id, accountId));

        if (pocketId) {
          await tx
            .update(financePockets)
            .set({
              currentBalance: sql`${financePockets.currentBalance} + ${adjustment}::numeric`,
            })
            .where(eq(financePockets.id, pocketId));
        }
      }
      await updateMonthlySummary(tx, householdId, transactionDate);
      return newTransaction;
    });

    return sendStandardResponse(result, "Transaction saved successfully.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    const result = await db.transaction(async (tx) => {
      const oldTransaction = await tx.query.financeTransactions.findFirst({
        where: eq(financeTransactions.id, id),
      });

      if (!oldTransaction) throw new Error("Transaction not found");

      const [updated] = await tx
        .update(financeTransactions)
        .set({ status })
        .where(eq(financeTransactions.id, id))
        .returning();

      if (oldTransaction.status !== "cancelled" && status === "cancelled") {
        const reverseAdjustment =
          oldTransaction.type === "income"
            ? -Number(oldTransaction.amount)
            : Number(oldTransaction.amount);
        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${reverseAdjustment}`,
          })
          .where(eq(financeAccounts.id, oldTransaction.accountId));
      } else if (
        oldTransaction.status === "cancelled" &&
        status !== "cancelled"
      ) {
        const adjustment =
          oldTransaction.type === "income"
            ? Number(oldTransaction.amount)
            : -Number(oldTransaction.amount);
        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${adjustment}`,
          })
          .where(eq(financeAccounts.id, oldTransaction.accountId));
      }

      await updateMonthlySummary(
        tx,
        oldTransaction.householdId,
        new Date(oldTransaction.date),
      );

      return updated;
    });

    return sendStandardResponse(result, "Transaction updated successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function DELETE(req: Request) {
  return (await h()).DELETE(req);
}

async function updateMonthlySummary(
  tx: any,
  householdId: string,
  transactionDate: Date,
) {
  const month = transactionDate.getMonth() + 1;
  const year = transactionDate.getFullYear();

  const [summaryData] = await tx
    .select({
      totalIncome: sql`coalesce(sum(case when ${financeTransactions.type} = 'income' then ${financeTransactions.amount} else 0 end), 0)`,
      totalExpense: sql`coalesce(sum(case when ${financeTransactions.type} = 'expense' then ${financeTransactions.amount} else 0 end), 0)`,
    })
    .from(financeTransactions)
    .where(
      and(
        eq(financeTransactions.householdId, householdId),
        sql`extract(month from ${financeTransactions.date}) = ${month}`,
        sql`extract(year from ${financeTransactions.date}) = ${year}`,
        sql`(${financeTransactions.status} != 'cancelled' OR ${financeTransactions.status} IS NULL)`,
        isNull(financeTransactions.deletedAt),
      ),
    );

  const totalIncome = Number(summaryData?.totalIncome ?? 0);
  const totalExpense = Number(summaryData?.totalExpense ?? 0);
  const netBalance = totalIncome - totalExpense;

  const existing = await tx.query.financeMonthlySummaries.findFirst({
    where: and(
      eq(financeMonthlySummaries.householdId, householdId),
      eq(financeMonthlySummaries.month, month),
      eq(financeMonthlySummaries.year, year),
    ),
  });

  if (existing) {
    await tx
      .update(financeMonthlySummaries)
      .set({
        totalIncome: String(totalIncome),
        totalExpense: String(totalExpense),
        netBalance: String(netBalance),
        updatedAt: new Date(),
      })
      .where(eq(financeMonthlySummaries.id, existing.id));
  } else {
    await tx.insert(financeMonthlySummaries).values({
      householdId,
      month,
      year,
      totalIncome: String(totalIncome),
      totalExpense: String(totalExpense),
      netBalance: String(netBalance),
    });
  }
}
