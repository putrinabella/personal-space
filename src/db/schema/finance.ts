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
  foreignKey,
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

// 1. ACCOUNTS
export const financeAccounts = financeSchema.table("finance_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["cash", "bank", "ewallet", "credit_card", "investment"],
  }).notNull(),
  currentBalance: numeric("current_balance", {
    precision: 15,
    scale: 2,
  })
    .default("0")
    .notNull(),
  currency: text("currency").default("IDR").notNull(),
  color: text("color"),
  iconSlug: text("icon_slug"),
  isArchived: boolean("is_archived").default(false),
  ...auditColumns,
});

// 2. POCKETS
export const financePockets = financeSchema.table("finance_pockets", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["general", "saving"],
  })
    .default("general")
    .notNull(),
  monthlyAllocationAmount: numeric("monthly_allocation_amount", {
    precision: 15,
    scale: 2,
  }),
  isAutoAllocationActive: boolean("is_auto_allocation_active").default(false),
  allocationDay: integer("allocation_day"),
  color: text("color"),
  iconSlug: text("icon_slug"),
  ...auditColumns,
});

// 3. CATEGORIES
export const financeCategories = financeSchema.table(
  "finance_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
      .notNull(),
    parentId: uuid("parent_id"),
    name: text("name").notNull(),
    type: text("type", {
      enum: ["income", "expense"],
    }).notNull(),
    iconSlug: text("icon_slug"),
    color: text("color"),
    ...auditColumns,
  },
  (table) => ({
    parentCategoryFk: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "finance_categories_parent_category_fk",
    }),
  }),
);

// 4. TRANSACTIONS
export const financeTransactions = financeSchema.table("finance_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  accountId: uuid("account_id")
    .references(() => financeAccounts.id)
    .notNull(),
  pocketId: uuid("pocket_id").references(() => financePockets.id),
  categoryId: uuid("category_id")
    .references(() => financeCategories.id)
    .notNull(),
  createdById: uuid("created_by_user_id")
    .references(() => users.id)
    .notNull(),
  amount: numeric("amount", {
    precision: 15,
    scale: 2,
  }).notNull(),
  type: text("type", {
    enum: ["income", "expense"],
  }).notNull(),
  status: text("status", {
    enum: ["pending", "completed", "cancelled"],
  })
    .default("completed")
    .notNull(),
  description: text("description"),
  date: timestamp("date", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  ...auditColumns,
});

// 5. ACCOUNT TRANSFERS
export const financeAccountTransfers = financeSchema.table(
  "finance_account_transfers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
      .notNull(),
    fromAccountId: uuid("from_account_id")
      .references(() => financeAccounts.id)
      .notNull(),
    toAccountId: uuid("to_account_id")
      .references(() => financeAccounts.id)
      .notNull(),
    amount: numeric("amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    date: timestamp("date", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    description: text("description"),
    ...auditColumns,
  },
);

// 6. BUDGETS
export const financeBudgets = financeSchema.table("finance_budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => financeCategories.id)
    .notNull(),
  amount: numeric("amount", {
    precision: 15,
    scale: 2,
  }).notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  ...auditColumns,
});

// 7. TAGS
export const financeTags = financeSchema.table("finance_tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  color: text("color"),
  ...auditColumns,
});

// 8. TRANSACTION TAGS (PIVOT)
export const financeTransactionTags = financeSchema.table(
  "finance_transaction_tags",
  {
    transactionId: uuid("transaction_id")
      .references(() => financeTransactions.id)
      .notNull(),
    tagId: uuid("tag_id")
      .references(() => financeTags.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.transactionId, table.tagId],
    }),
  }),
);

// 9. SAVING GOALS
export const financeSavingGoals = financeSchema.table("finance_saving_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  pocketId: uuid("pocket_id")
    .references(() => financePockets.id)
    .notNull(),
  targetAmount: numeric("target_amount", {
    precision: 15,
    scale: 2,
  }).notNull(),
  targetDate: date("target_date"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  ...auditColumns,
});

// 10. RECURRING TRANSACTIONS
export const financeRecurringTransactions = financeSchema.table(
  "finance_recurring_transactions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
      .notNull(),
    accountId: uuid("account_id")
      .references(() => financeAccounts.id)
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => financeCategories.id)
      .notNull(),
    pocketId: uuid("pocket_id").references(() => financePockets.id),
    amount: numeric("amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    type: text("type", {
      enum: ["income", "expense"],
    }).notNull(),
    frequency: text("frequency", {
      enum: ["daily", "weekly", "monthly", "yearly"],
    }).notNull(),
    nextRun: timestamp("next_run", {
      withTimezone: true,
    }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    ...auditColumns,
  },
);

// 11. TRANSACTION LOGS
export const financeTransactionLogs = financeSchema.table(
  "finance_transaction_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    transactionId: uuid("transaction_id")
      .references(() => financeTransactions.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    action: text("action").notNull(),
    oldValue: text("old_value"),
    newValue: text("new_value"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
);

// 12. MONTHLY SUMMARIES
export const financeMonthlySummaries = financeSchema.table(
  "finance_monthly_summaries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
      .notNull(),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    totalIncome: numeric("total_income", {
      precision: 15,
      scale: 2,
    }).default("0"),
    totalExpense: numeric("total_expense", {
      precision: 15,
      scale: 2,
    }).default("0"),
    totalSavings: numeric("total_savings", {
      precision: 15,
      scale: 2,
    }).default("0"),
    netBalance: numeric("net_balance", {
      precision: 15,
      scale: 2,
    }).default("0"),
    ...auditColumns,
  },
);

export const householdsRelations = relations(households, ({ many }) => ({
  members: many(householdMembers),
  financeAccounts: many(financeAccounts),
  financePockets: many(financePockets),
  financeCategories: many(financeCategories),
  financeBudgets: many(financeBudgets),
  financeTransactions: many(financeTransactions),
  financeAccountTransfers: many(financeAccountTransfers),
  financeRecurringTransactions: many(financeRecurringTransactions),
  financeTags: many(financeTags),
  financeMonthlySummaries: many(financeMonthlySummaries),
}));
export const householdMembersRelations = relations(
  householdMembers,
  ({ one }) => ({
    household: one(households, {
      fields: [householdMembers.householdId],
      references: [households.id],
    }),

    user: one(users, {
      fields: [householdMembers.userId],
      references: [users.id],
    }),
  }),
);
export const financeAccountsRelations = relations(
  financeAccounts,
  ({ one, many }) => ({
    household: one(households, {
      fields: [financeAccounts.householdId],
      references: [households.id],
    }),

    financeTransactions: many(financeTransactions),

    outgoingTransfers: many(financeAccountTransfers, {
      relationName: "fromAccount",
    }),

    incomingTransfers: many(financeAccountTransfers, {
      relationName: "toAccount",
    }),

    financeRecurringTransactions: many(financeRecurringTransactions),
  }),
);
export const financePocketsRelations = relations(
  financePockets,
  ({ one, many }) => ({
    household: one(households, {
      fields: [financePockets.householdId],
      references: [households.id],
    }),

    financeTransactions: many(financeTransactions),

    financeRecurringTransactions: many(financeRecurringTransactions),

    financeSavingGoals: many(financeSavingGoals),
  }),
);
export const financeCategoriesRelations = relations(
  financeCategories,
  ({ one, many }) => ({
    household: one(households, {
      fields: [financeCategories.householdId],
      references: [households.id],
    }),

    parent: one(financeCategories, {
      fields: [financeCategories.parentId],
      references: [financeCategories.id],
      relationName: "parentCategory",
    }),

    children: many(financeCategories, {
      relationName: "parentCategory",
    }),

    financeTransactions: many(financeTransactions),

    financeBudgets: many(financeBudgets),

    financeRecurringTransactions: many(financeRecurringTransactions),
  }),
);
export const financeTransactionsRelations = relations(
  financeTransactions,
  ({ one, many }) => ({
    household: one(households, {
      fields: [financeTransactions.householdId],
      references: [households.id],
    }),

    account: one(financeAccounts, {
      fields: [financeTransactions.accountId],
      references: [financeAccounts.id],
    }),

    pocket: one(financePockets, {
      fields: [financeTransactions.pocketId],
      references: [financePockets.id],
    }),

    category: one(financeCategories, {
      fields: [financeTransactions.categoryId],
      references: [financeCategories.id],
    }),

    createdBy: one(users, {
      fields: [financeTransactions.createdById],
      references: [users.id],
    }),

    financeTags: many(financeTransactionTags),

    logs: many(financeTransactionLogs),
  }),
);
export const financeAccountTransfersRelations = relations(
  financeAccountTransfers,
  ({ one }) => ({
    household: one(households, {
      fields: [financeAccountTransfers.householdId],
      references: [households.id],
    }),

    fromAccount: one(financeAccounts, {
      fields: [financeAccountTransfers.fromAccountId],
      references: [financeAccounts.id],
      relationName: "fromAccount",
    }),

    toAccount: one(financeAccounts, {
      fields: [financeAccountTransfers.toAccountId],
      references: [financeAccounts.id],
      relationName: "toAccount",
    }),
  }),
);
export const financeBudgetsRelations = relations(financeBudgets, ({ one }) => ({
  household: one(households, {
    fields: [financeBudgets.householdId],
    references: [households.id],
  }),

  category: one(financeCategories, {
    fields: [financeBudgets.categoryId],
    references: [financeCategories.id],
  }),
}));
export const financeTagsRelations = relations(financeTags, ({ one, many }) => ({
  household: one(households, {
    fields: [financeTags.householdId],
    references: [households.id],
  }),

  financeTransactions: many(financeTransactionTags),
}));
export const financeTransactionTagsRelations = relations(
  financeTransactionTags,
  ({ one }) => ({
    transaction: one(financeTransactions, {
      fields: [financeTransactionTags.transactionId],
      references: [financeTransactions.id],
    }),

    tag: one(financeTags, {
      fields: [financeTransactionTags.tagId],
      references: [financeTags.id],
    }),
  }),
);
export const financeSavingGoalsRelations = relations(
  financeSavingGoals,
  ({ one }) => ({
    pocket: one(financePockets, {
      fields: [financeSavingGoals.pocketId],
      references: [financePockets.id],
    }),
  }),
);
export const financeRecurringTransactionsRelations = relations(
  financeRecurringTransactions,
  ({ one }) => ({
    household: one(households, {
      fields: [financeRecurringTransactions.householdId],
      references: [households.id],
    }),

    account: one(financeAccounts, {
      fields: [financeRecurringTransactions.accountId],
      references: [financeAccounts.id],
    }),

    pocket: one(financePockets, {
      fields: [financeRecurringTransactions.pocketId],
      references: [financePockets.id],
    }),

    category: one(financeCategories, {
      fields: [financeRecurringTransactions.categoryId],
      references: [financeCategories.id],
    }),
  }),
);
export const financeTransactionLogsRelations = relations(
  financeTransactionLogs,
  ({ one }) => ({
    transaction: one(financeTransactions, {
      fields: [financeTransactionLogs.transactionId],
      references: [financeTransactions.id],
    }),

    user: one(users, {
      fields: [financeTransactionLogs.userId],
      references: [users.id],
    }),
  }),
);
export const financeMonthlySummariesRelations = relations(
  financeMonthlySummaries,
  ({ one }) => ({
    household: one(households, {
      fields: [financeMonthlySummaries.householdId],
      references: [households.id],
    }),
  }),
);
