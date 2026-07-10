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
  pgSchema,
} from "drizzle-orm/pg-core";

const auth = pgSchema("auth");

export const users = auth.table("users", {
  id: uuid("id").primaryKey(),
});

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

export const diningType = pgTable("dining_types", {
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

export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdById: uuid("created_by").references(() => users.id),
  name: text("name").notNull(),
  address: text("address"),
  googleMapsUrl: text("google_maps_url"),
  isFavoriteRestaurant: boolean("is_favorite_restaurant")
    .default(false)
    .notNull(),
  isCafe: boolean("is_cafe").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const foods = pgTable("foods", {
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
    .references(() => diningType.id, { onDelete: "restrict" })
    .notNull(),
  foodName: text("food_name").notNull(),
  isFavoriteFood: boolean("is_favorite_food").default(false).notNull(),
  isFavoriteDrink: boolean("is_favorite_drink").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const foodLogs = pgTable("food_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  foodId: uuid("food_id")
    .references(() => foods.id, { onDelete: "cascade" })
    .notNull(),
  dateVisited: date("date_visited").defaultNow().notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  reviewText: text("review_text"),
  ratingHis: integer("rating_his"),
  ratingHer: integer("rating_her"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const foodLogTags = pgTable(
  "food_log_tags",
  {
    foodLogId: uuid("food_log_id")
      .references(() => foodLogs.id, { onDelete: "cascade" })
      .notNull(),
    tagId: uuid("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.foodLogId, t.tagId] })],
);

export const foodsRelations = relations(foods, ({ one, many }) => ({
  restaurant: one(restaurants, {
    fields: [foods.restaurantId],
    references: [restaurants.id],
  }),
  category: one(categories, {
    fields: [foods.categoryId],
    references: [categories.id],
  }),
  cuisine: one(cuisines, {
    fields: [foods.cuisineId],
    references: [cuisines.id],
  }),
  diningType: one(diningType, {
    fields: [foods.diningTypeId],
    references: [diningType.id],
  }),
  logs: many(foodLogs),
}));

export const foodLogsRelations = relations(foodLogs, ({ one, many }) => ({
  food: one(foods, { fields: [foodLogs.foodId], references: [foods.id] }),
  tags: many(foodLogTags),
}));

export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  foods: many(foods),
}));

export const foodLogTagsRelations = relations(foodLogTags, ({ one }) => ({
  foodLog: one(foodLogs, {
    fields: [foodLogTags.foodLogId],
    references: [foodLogs.id],
  }),
  tag: one(tags, { fields: [foodLogTags.tagId], references: [tags.id] }),
}));
