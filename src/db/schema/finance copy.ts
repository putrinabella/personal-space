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
const auditColumns = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

// 1. Households
export const households = financeSchema.table("households", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ...auditColumns,
});

// 2. Members
export const householdMembers = financeSchema.table("household_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  role: text("role", { enum: ["owner", "member"] })
    .default("member")
    .notNull(),
  ...auditColumns,
});

// 3. Pockets
export const pockets = financeSchema.table("pockets", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", { enum: ["general", "saving"] })
    .default("general")
    .notNull(),
  balance: numeric("balance", { precision: 15, scale: 2 })
    .default("0")
    .notNull(),
  isAutoAllocationActive: boolean("is_auto_allocation_active").default(false),
  monthlyAllocationAmount: numeric("monthly_amount", {
    precision: 15,
    scale: 2,
  }),
  allocationDay: text("allocation_day"),
  ...auditColumns,
});

// 4. Categories (Types)
export const types = financeSchema.table("types", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  iconSlug: text("icon_slug"),
  ...auditColumns,
});

// 5. Transactions
export const transactions = financeSchema.table("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  pocketId: uuid("pocket_id")
    .references(() => pockets.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => types.id)
    .notNull(),
  createdById: uuid("created_by_user_id")
    .references(() => users.id)
    .notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  type: text("type", { enum: ["income", "expense"] }).notNull(),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(),
  description: text("description"),
  ...auditColumns,
});
// 4. Pocket Transfers (Internal)
export const pocketTransfers = financeSchema.table("pocket_transfers", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  fromPocketId: uuid("from_pocket_id")
    .references(() => pockets.id)
    .notNull(),
  toPocketId: uuid("to_pocket_id")
    .references(() => pockets.id)
    .notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  date: timestamp("date", { withTimezone: true }).defaultNow().notNull(),
  ...auditColumns,
});
// --- Relations ---
export const pocketsRelations = relations(pockets, ({ one, many }) => ({
  household: one(households, {
    fields: [pockets.householdId],
    references: [households.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  household: one(households, {
    fields: [transactions.householdId],
    references: [households.id],
  }),
  pocket: one(pockets, {
    fields: [transactions.pocketId],
    references: [pockets.id],
  }),
  category: one(types, {
    fields: [transactions.categoryId],
    references: [types.id],
  }),
}));
