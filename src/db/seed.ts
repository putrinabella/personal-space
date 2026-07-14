// src/db/seed-finance.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // Pastikan path ke schema finance sudah benar
import { eq, and, desc, sql } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

const MY_HOUSEHOLD_ID = "2fb75d5e-3b0d-4ae5-80aa-adc9b9f9cb5f";
const TARGET_USER_ID = "cea8c189-1e5b-4031-b8ed-99b2e4e2f9cd";

async function main() {
  try {
    console.log(
      "⏳ Membersihkan data finance untuk Household:",
      MY_HOUSEHOLD_ID,
    );

    // Hapus data hanya milik household tersebut agar data orang lain tidak terhapus
    await db
      .delete(schema.pocketTransfers)
      .where(eq(schema.pocketTransfers.householdId, MY_HOUSEHOLD_ID)); // Hapus 'schema.' sebelum eq

    await db
      .delete(schema.transactions)
      .where(eq(schema.transactions.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.types)
      .where(eq(schema.types.householdId, MY_HOUSEHOLD_ID));

    await db
      .delete(schema.pockets)
      .where(eq(schema.pockets.householdId, MY_HOUSEHOLD_ID));

    console.log("🌱 Mulai seeding data...");

    // 1. Seed Pockets
    const insertedPockets = await db
      .insert(schema.pockets)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Main Wallet",
          type: "general",
          balance: "1000000.00",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Emergency Fund",
          type: "saving",
          balance: "5000000.00",
        },
      ])
      .returning();

    // 2. Seed Categories
    const insertedTypes = await db
      .insert(schema.types)
      .values([
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Salary",
          type: "income",
          iconSlug: "briefcase",
        },
        {
          householdId: MY_HOUSEHOLD_ID,
          name: "Food",
          type: "expense",
          iconSlug: "coffee",
        },
      ])
      .returning();

    // 3. Seed Transactions
    await db.insert(schema.transactions).values([
      {
        householdId: MY_HOUSEHOLD_ID,
        pocketId: insertedPockets[0].id,
        categoryId: insertedTypes[0].id,
        createdById: TARGET_USER_ID,
        amount: "10000000.00",
        type: "income",
        description: "Monthly Salary",
      },
    ]);

    console.log("✅ Seeding selesai!");
  } catch (err) {
    console.error("❌ Seeding gagal:", err);
  } finally {
    await client.end();
  }
}

main();
