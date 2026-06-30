// src/db/schema.ts
import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  date,
  boolean,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";

// 1. LOOKUP TABLES
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  iconSlug: text("icon_slug"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const cuisines = pgTable("cuisines", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const DiningTypesEntry = pgTable("dining_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  bgColor: text("bg_color"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// 2. CORE OPERATIONAL TABLES
export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  googleMapsUrl: text("google_maps_url"),
  isFavoriteRestaurant: boolean("is_favorite_restaurant")
    .default(false)
    .notNull(),
  isFavoriteCafe: boolean("is_favorite_cafe").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const foodEntries = pgTable("food_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  restaurantId: uuid("restaurant_id")
    .references(() => restaurants.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "restrict" })
    .notNull(),
  cuisineId: uuid("cuisine_id")
    .references(() => cuisines.id, { onDelete: "restrict" })
    .notNull(),
  diningTypeId: uuid("dining_type_id")
    .references(() => DiningTypesEntry.id, { onDelete: "restrict" })
    .notNull(),
  foodName: text("food_name").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  dateVisited: date("date_visited").defaultNow().notNull(),
  reviewText: text("review_text"),
  ratingOverall: integer("rating_overall").notNull(),
  ratingTaste: integer("rating_taste"),
  ratingPortion: integer("rating_portion"),
  ratingValue: integer("rating_value"),
  ratingAtmosphere: integer("rating_atmosphere"),
  isFavoriteFood: boolean("is_favorite_food").default(false).notNull(),
  isFavoriteDrink: boolean("is_favorite_drink").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// 3. JUNCTION TABLE (Many-to-Many)
export const foodEntryTags = pgTable(
  "food_entry_tags",
  {
    foodEntryId: uuid("food_entry_id")
      .references(() => foodEntries.id, { onDelete: "cascade" })
      .notNull(),
    tagId: uuid("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.foodEntryId, table.tagId] })],
);

// Relations for Food Entries
export const foodEntriesRelations = relations(foodEntries, ({ one, many }) => ({
  restaurant: one(restaurants, {
    fields: [foodEntries.restaurantId],
    references: [restaurants.id],
  }),
  category: one(categories, {
    fields: [foodEntries.categoryId],
    references: [categories.id],
  }),
  cuisine: one(cuisines, {
    fields: [foodEntries.cuisineId],
    references: [cuisines.id],
  }),
  diningType: one(DiningTypesEntry, {
    fields: [foodEntries.diningTypeId],
    references: [DiningTypesEntry.id],
  }),
  tags: many(foodEntryTags),
}));

// Relations for Restaurants
export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  foodEntries: many(foodEntries),
}));

// Relations for Junction Table
export const foodEntryTagsRelations = relations(foodEntryTags, ({ one }) => ({
  foodEntry: one(foodEntries, {
    fields: [foodEntryTags.foodEntryId],
    references: [foodEntries.id],
  }),
  tag: one(tags, { fields: [foodEntryTags.tagId], references: [tags.id] }),
}));
