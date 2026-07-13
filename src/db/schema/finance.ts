import { relations } from "drizzle-orm";
import {
  uuid,
  text,
  numeric,
  integer,
  date,
  boolean,
  primaryKey,
  timestamp,
  pgSchema,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const financeSchema = pgSchema("finance");

export const pockets = financeSchema.table("pockets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", { enum: ["general", "saving"] })
    .default("general")
    .notNull(),
  balance: numeric("balance", { precision: 15, scale: 2 })
    .default("0")
    .notNull(),

  // Konfigurasi Saving
  isAutoAllocationActive: boolean("is_auto_allocation_active").default(false),
  monthlyAllocationAmount: numeric("monthly_amount", {
    precision: 15,
    scale: 2,
  }),
  allocationDay: text("allocation_day"), // '01', '05', dst

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// 2. Categories
export const types = financeSchema.table("types", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  iconSlug: text("icon_slug"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 3. Transactions
export const transactions = financeSchema.table("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  pocketId: uuid("pocket_id")
    .references(() => pockets.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => types.id)
    .notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 4. Pocket Transfers (Internal)
export const pocketTransfers = financeSchema.table("pocket_transfers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  fromPocketId: uuid("from_pocket_id")
    .references(() => pockets.id)
    .notNull(),
  toPocketId: uuid("to_pocket_id")
    .references(() => pockets.id)
    .notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(),
});

// --- Relations ---
export const pocketsRelations = relations(pockets, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  pocket: one(pockets, {
    fields: [transactions.pocketId],
    references: [pockets.id],
  }),
  category: one(types, {
    fields: [transactions.categoryId],
    references: [types.id],
  }),
}));
