import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });

const db = drizzle(client, { schema });

const MY_HOUSEHOLD_ID = "2fb75d5e-3b0d-4ae5-80aa-adc9b9f9cb5f";
const TARGET_USER_ID = "cea8c189-1e5b-4031-b8ed-99b2e4e2f9cd";

async function main() {
  try {
    console.log("🧹 Cleaning finance data...");

    await db.delete(schema.financeTransactionTags);

    await db.delete(schema.financeTransactionLogs);

    await db
      .delete(schema.financeRecurringTransactions)
      .where(
        eq(schema.financeRecurringTransactions.householdId, MY_HOUSEHOLD_ID),
      );

    await db
      .delete(schema.financeAccountTransfers)
      .where(eq(schema.financeAccountTransfers.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.financeTransactions)
      .where(eq(schema.financeTransactions.householdId, MY_HOUSEHOLD_ID));

    await db.delete(schema.financeSavingGoals);

    await db
      .delete(schema.financeBudgets)
      .where(eq(schema.financeBudgets.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.financeTags)
      .where(eq(schema.financeTags.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.financeCategories)
      .where(eq(schema.financeCategories.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.financePockets)
      .where(eq(schema.financePockets.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.financeAccounts)
      .where(eq(schema.financeAccounts.householdId, MY_HOUSEHOLD_ID));

    console.log("🌱 Seeding...");

    const accounts = await db
      .insert(schema.financeAccounts)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Cash Wallet",
          type: "cash",
          currentBalance: "1000000",
          color: "#22c55e",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "BCA",
          type: "bank",
          currentBalance: "7500000",
          color: "#2563eb",
        },
      ])
      .returning();

    const pockets = await db
      .insert(schema.financePockets)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Daily",
          type: "general",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Emergency Fund",
          type: "saving",
        },
      ])
      .returning();

    const categories = await db
      .insert(schema.financeCategories)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Salary",
          type: "income",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Food",
          type: "expense",
        },
      ])
      .returning();

    await db.insert(schema.financeBudgets).values({
      householdId: MY_HOUSEHOLD_ID,
      categoryId: categories[1].id,
      amount: "3000000",
      month: 7,
      year: 2026,
    });

    const tags = await db
      .insert(schema.financeTags)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Personal",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Family",
        },
      ])
      .returning();

    await db.insert(schema.financeSavingGoals).values({
      name: "Emergency Fund",
      description: "6 months living expenses",
      pocketId: pockets[1].id,
      targetAmount: "50000000",
    });

    await db.insert(schema.financeRecurringTransactions).values({
      householdId: MY_HOUSEHOLD_ID,
      accountId: accounts[1].id,
      categoryId: categories[0].id,
      amount: "10000000",
      type: "income",
      frequency: "monthly",
      nextRun: new Date(),
    });

    const transactions = await db
      .insert(schema.financeTransactions)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          accountId: accounts[1].id,
          pocketId: pockets[0].id,
          categoryId: categories[0].id,
          createdById: TARGET_USER_ID,
          amount: "10000000",
          type: "income",
          description: "Monthly Salary",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          accountId: accounts[0].id,
          pocketId: pockets[0].id,
          categoryId: categories[1].id,
          createdById: TARGET_USER_ID,
          amount: "75000",
          type: "expense",
          description: "Lunch",
        },
      ])
      .returning();

    await db.insert(schema.financeTransactionTags).values([
      {
        transactionId: transactions[0].id,
        tagId: tags[0].id,
      },
      {
        transactionId: transactions[1].id,
        tagId: tags[1].id,
      },
    ]);

    await db.insert(schema.financeAccountTransfers).values({
      householdId: MY_HOUSEHOLD_ID,
      fromAccountId: accounts[1].id,
      toAccountId: accounts[0].id,
      amount: "500000",
      description: "Transfer to Cash",
    });

    await db.insert(schema.financeMonthlySummaries).values({
      householdId: MY_HOUSEHOLD_ID,
      month: 7,
      year: 2026,
      totalIncome: "10000000",
      totalExpense: "75000",
      totalSavings: "9925000",
      netBalance: "9925000",
    });

    console.log("✅ Finance seed completed.");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
