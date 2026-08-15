import { relations } from "drizzle-orm";
import {
  uuid,
  text,
  numeric,
  integer,
  date,
  primaryKey,
  timestamp,
  pgSchema,
  foreignKey,
} from "drizzle-orm/pg-core";
import { users } from "./auth"; // Menggunakan referensi tabel users yang sama

export const skincareSchema = pgSchema("skincare");

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

// 1. Households / Shared Shelves (jika ingin fitur kolaborasi rak skincare)
export const skincareHouseholds = skincareSchema.table("households", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ...auditColumns,
});

export const skincareHouseholdMembers = skincareSchema.table(
  "household_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => skincareHouseholds.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    role: text("role", { enum: ["owner", "member"] })
      .default("member")
      .notNull(),
    ...auditColumns,
  },
);

// 2. Kategori Skincare (Cleanser, Toner, Serum, dll)
export const skincareCategories = skincareSchema.table(
  "skincare_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => skincareHouseholds.id)
      .notNull(),
    parentId: uuid("parent_id"),
    name: text("name").notNull(),
    iconSlug: text("icon_slug"),
    color: text("color"),
    ...auditColumns,
  },
  (table) => ({
    parentCategoryFk: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: "skincare_categories_parent_category_fk",
    }),
  }),
);

// 3. Produk Skincare (Inventaris Utama)
export const skincareItems = skincareSchema.table("skincare_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => skincareHouseholds.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => skincareCategories.id)
    .notNull(),
  createdById: uuid("created_by_user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  status: text("status", {
    enum: ["active", "backup", "finished", "discarded"],
  })
    .default("active")
    .notNull(),
  store: text("store"),
  quantity: integer("quantity").default(1).notNull(),
  minStock: integer("min_stock").default(1).notNull(),
  price: numeric("price", {
    precision: 15,
    scale: 2,
  })
    .default("0")
    .notNull(),
  purchaseDate: date("purchase_date"),
  expiryDate: date("expiry_date"),
  dateOpened: date("date_opened"),
  paoMonths: integer("pao_months"), // Periode After Opening (bulan)
  rating: integer("rating"), // Skala 1-10
  notes: text("notes"),
  ...auditColumns,
});

// 4. Target Perawatan / Skin Concerns (Hidrasi, Jerawat, Anti-Aging, dll)
export const skincareConcerns = skincareSchema.table("skincare_concerns", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => skincareHouseholds.id)
    .notNull(),
  name: text("name").notNull(),
  color: text("color"),
  ...auditColumns,
});

// Relasi Many-to-Many antara Items dan Concerns
export const skincareItemConcerns = skincareSchema.table(
  "skincare_item_concerns",
  {
    itemId: uuid("item_id")
      .references(() => skincareItems.id)
      .notNull(),
    concernId: uuid("concern_id")
      .references(() => skincareConcerns.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.itemId, table.concernId],
    }),
  }),
);

// 5. Wishlist Produk Skincare
export const skincareWishlist = skincareSchema.table("skincare_wishlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => skincareHouseholds.id)
    .notNull(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  estimatedPrice: numeric("estimated_price", {
    precision: 15,
    scale: 2,
  })
    .default("0")
    .notNull(),
  storeLink: text("store_link"),
  priority: text("priority", {
    enum: ["High", "Medium", "Low"],
  })
    .default("Medium")
    .notNull(),
  reason: text("reason"),
  ...auditColumns,
});

// 6. Riwayat Produk Terbuang (Waste Tracker untuk Analitik)
export const skincareWasteHistory = skincareSchema.table(
  "skincare_waste_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => skincareHouseholds.id)
      .notNull(),
    itemId: uuid("item_id").references(() => skincareItems.id),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    price: numeric("price", {
      precision: 15,
      scale: 2,
    }).notNull(),
    expiredDate: date("expired_date").notNull(),
    ...auditColumns,
  },
);

// ==========================================
// RELATIONS DEFINITIONS
// ==========================================

export const skincareHouseholdsRelations = relations(
  skincareHouseholds,
  ({ many }) => ({
    members: many(skincareHouseholdMembers),
    categories: many(skincareCategories),
    items: many(skincareItems),
    concerns: many(skincareConcerns),
    wishlist: many(skincareWishlist),
    wasteHistory: many(skincareWasteHistory),
  }),
);

export const skincareHouseholdMembersRelations = relations(
  skincareHouseholdMembers,
  ({ one }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareHouseholdMembers.householdId],
      references: [skincareHouseholds.id],
    }),
    user: one(users, {
      fields: [skincareHouseholdMembers.userId],
      references: [users.id],
    }),
  }),
);

export const skincareCategoriesRelations = relations(
  skincareCategories,
  ({ one, many }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareCategories.householdId],
      references: [skincareHouseholds.id],
    }),
    parent: one(skincareCategories, {
      fields: [skincareCategories.parentId],
      references: [skincareCategories.id],
      relationName: "parentCategory",
    }),
    children: many(skincareCategories, {
      relationName: "parentCategory",
    }),
    items: many(skincareItems),
  }),
);

export const skincareItemsRelations = relations(
  skincareItems,
  ({ one, many }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareItems.householdId],
      references: [skincareHouseholds.id],
    }),
    category: one(skincareCategories, {
      fields: [skincareItems.categoryId],
      references: [skincareCategories.id],
    }),
    createdBy: one(users, {
      fields: [skincareItems.createdById],
      references: [users.id],
    }),
    concerns: many(skincareItemConcerns),
  }),
);

export const skincareConcernsRelations = relations(
  skincareConcerns,
  ({ one, many }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareConcerns.householdId],
      references: [skincareHouseholds.id],
    }),
    items: many(skincareItemConcerns),
  }),
);

export const skincareItemConcernsRelations = relations(
  skincareItemConcerns,
  ({ one }) => ({
    item: one(skincareItems, {
      fields: [skincareItemConcerns.itemId],
      references: [skincareItems.id],
    }),
    concern: one(skincareConcerns, {
      fields: [skincareItemConcerns.concernId],
      references: [skincareConcerns.id],
    }),
  }),
);

export const skincareWishlistRelations = relations(
  skincareWishlist,
  ({ one }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareWishlist.householdId],
      references: [skincareHouseholds.id],
    }),
  }),
);

export const skincareWasteHistoryRelations = relations(
  skincareWasteHistory,
  ({ one }) => ({
    household: one(skincareHouseholds, {
      fields: [skincareWasteHistory.householdId],
      references: [skincareHouseholds.id],
    }),
    item: one(skincareItems, {
      fields: [skincareWasteHistory.itemId],
      references: [skincareItems.id],
    }),
  }),
);
