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
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { households } from "./finance";

export const beautySchema = pgSchema("beauty");

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

export const beautyBrands = beautySchema.table(
  "beauty_brands",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
      .notNull(),
    name: text("name").notNull(),
    storeLink: text("store_link"),
    logoUrl: text("logo_url"),
    ...auditColumns,
  },
  (table) => ({
    uniqueBrandPerHousehold: uniqueIndex("idx_beauty_brands_household_name").on(
      table.householdId,
      table.name,
    ),
  }),
);

export const beautyCategories = beautySchema.table(
  "beauty_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    householdId: uuid("household_id")
      .references(() => households.id)
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
      name: "beauty_categories_parent_category_fk",
    }),
  }),
);

export const beautyItems = beautySchema.table("beauty_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => beautyCategories.id)
    .notNull(),
  createdById: uuid("created_by_user_id")
    .references(() => users.id)
    .notNull(),

  brandId: uuid("brand_id")
    .references(() => beautyBrands.id)
    .notNull(),

  name: text("name").notNull(),
  minStock: integer("min_stock").default(1).notNull(),
  rating: integer("rating"),
  notes: text("notes"),
  ...auditColumns,
});

export const beautyItemUnits = beautySchema.table("beauty_item_units", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: uuid("item_id")
    .references(() => beautyItems.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status", {
    enum: ["active", "backup", "finished", "discarded", "expired"],
  })
    .default("active")
    .notNull(),
  price: numeric("price", { precision: 15, scale: 2 }).default("0").notNull(),
  purchaseDate: timestamp("purchase_date", { withTimezone: true }),
  expiryDate: timestamp("expiry_date", { withTimezone: true }),
  dateOpened: timestamp("date_opened", { withTimezone: true }),
  paoMonths: integer("pao_months"),
  ...auditColumns,
});

export const beautyConcerns = beautySchema.table("beauty_concerns", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  color: text("color"),
  ...auditColumns,
});

export const beautyItemConcerns = beautySchema.table(
  "beauty_item_concerns",
  {
    itemId: uuid("item_id")
      .references(() => beautyItems.id, { onDelete: "cascade" })
      .notNull(),
    concernId: uuid("concern_id")
      .references(() => beautyConcerns.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.itemId, table.concernId],
    }),
  }),
);

export const beautyWishlist = beautySchema.table("beauty_wishlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  name: text("name").notNull(),
  brandId: uuid("brand_id")
    .references(() => beautyBrands.id)
    .notNull(),

  estimatedPrice: numeric("estimated_price", { precision: 15, scale: 2 })
    .default("0")
    .notNull(),
  storeLink: text("store_link"),
  priority: text("priority", { enum: ["High", "Medium", "Low"] })
    .default("Medium")
    .notNull(),
  reason: text("reason"),
  ...auditColumns,
});

export const beautyWasteHistory = beautySchema.table("beauty_waste_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .references(() => households.id)
    .notNull(),
  itemId: uuid("item_id").references(() => beautyItems.id, {
    onDelete: "set null",
  }),
  brandId: uuid("brand_id").references(() => beautyBrands.id, {
    onDelete: "set null",
  }),
  brandNameSnapshot: text("brand_name_snapshot").notNull(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 15, scale: 2 }).notNull(),
  expiredDate: date("expired_date").notNull(),
  ...auditColumns,
});

export const beautyBrandsRelations = relations(
  beautyBrands,
  ({ one, many }) => ({
    household: one(households, {
      fields: [beautyBrands.householdId],
      references: [households.id],
    }),
    items: many(beautyItems),
    wishlistItems: many(beautyWishlist),
    wasteHistory: many(beautyWasteHistory),
  }),
);

export const beautyCategoriesRelations = relations(
  beautyCategories,
  ({ one, many }) => ({
    household: one(households, {
      fields: [beautyCategories.householdId],
      references: [households.id],
    }),
    parent: one(beautyCategories, {
      fields: [beautyCategories.parentId],
      references: [beautyCategories.id],
      relationName: "parentCategory",
    }),
    children: many(beautyCategories, { relationName: "parentCategory" }),
    items: many(beautyItems),
  }),
);

export const beautyItemsRelations = relations(beautyItems, ({ one, many }) => ({
  household: one(households, {
    fields: [beautyItems.householdId],
    references: [households.id],
  }),
  category: one(beautyCategories, {
    fields: [beautyItems.categoryId],
    references: [beautyCategories.id],
  }),
  createdBy: one(users, {
    fields: [beautyItems.createdById],
    references: [users.id],
  }),
  brand: one(beautyBrands, {
    fields: [beautyItems.brandId],
    references: [beautyBrands.id],
  }),
  units: many(beautyItemUnits),
  concerns: many(beautyItemConcerns),
}));

export const beautyItemUnitsRelations = relations(
  beautyItemUnits,
  ({ one }) => ({
    item: one(beautyItems, {
      fields: [beautyItemUnits.itemId],
      references: [beautyItems.id],
    }),
  }),
);

export const beautyConcernsRelations = relations(
  beautyConcerns,
  ({ one, many }) => ({
    household: one(households, {
      fields: [beautyConcerns.householdId],
      references: [households.id],
    }),
    items: many(beautyItemConcerns),
  }),
);

export const beautyItemConcernsRelations = relations(
  beautyItemConcerns,
  ({ one }) => ({
    item: one(beautyItems, {
      fields: [beautyItemConcerns.itemId],
      references: [beautyItems.id],
    }),
    concern: one(beautyConcerns, {
      fields: [beautyItemConcerns.concernId],
      references: [beautyConcerns.id],
    }),
  }),
);

export const beautyWishlistRelations = relations(beautyWishlist, ({ one }) => ({
  household: one(households, {
    fields: [beautyWishlist.householdId],
    references: [households.id],
  }),
  brand: one(beautyBrands, {
    fields: [beautyWishlist.brandId],
    references: [beautyBrands.id],
  }),
}));

export const beautyWasteHistoryRelations = relations(
  beautyWasteHistory,
  ({ one }) => ({
    household: one(households, {
      fields: [beautyWasteHistory.householdId],
      references: [households.id],
    }),
    item: one(beautyItems, {
      fields: [beautyWasteHistory.itemId],
      references: [beautyItems.id],
    }),
    brand: one(beautyBrands, {
      fields: [beautyWasteHistory.brandId],
      references: [beautyBrands.id],
    }),
  }),
);
