CREATE SCHEMA "beauty";
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"parent_id" uuid,
	"name" text NOT NULL,
	"icon_slug" text,
	"color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_concerns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_item_concerns" (
	"item_id" uuid NOT NULL,
	"concern_id" uuid NOT NULL,
	CONSTRAINT "beauty_item_concerns_item_id_concern_id_pk" PRIMARY KEY("item_id","concern_id")
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"brand_id" uuid NOT NULL,
	"store_id" uuid,
	"name" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"min_stock" integer DEFAULT 1 NOT NULL,
	"price" numeric(15, 2) DEFAULT '0' NOT NULL,
	"purchase_date" date,
	"expiry_date" date,
	"date_opened" date,
	"pao_months" integer,
	"rating" integer,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_stores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"store_link" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_waste_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"item_id" uuid,
	"brand_id" uuid,
	"brand_name_snapshot" text NOT NULL,
	"name" text NOT NULL,
	"price" numeric(15, 2) NOT NULL,
	"expired_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "beauty"."beauty_wishlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"brand_id" uuid NOT NULL,
	"store_id" uuid,
	"estimated_price" numeric(15, 2) DEFAULT '0' NOT NULL,
	"store_link" text,
	"priority" text DEFAULT 'Medium' NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "skincare"."skincare_categories" CASCADE;--> statement-breakpoint
DROP TABLE "skincare"."skincare_concerns" CASCADE;--> statement-breakpoint
DROP TABLE "skincare"."skincare_item_concerns" CASCADE;--> statement-breakpoint
DROP TABLE "skincare"."skincare_items" CASCADE;--> statement-breakpoint
DROP TABLE "skincare"."skincare_waste_history" CASCADE;--> statement-breakpoint
DROP TABLE "skincare"."skincare_wishlist" CASCADE;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_brands" ADD CONSTRAINT "beauty_brands_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_categories" ADD CONSTRAINT "beauty_categories_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_categories" ADD CONSTRAINT "beauty_categories_parent_category_fk" FOREIGN KEY ("parent_id") REFERENCES "beauty"."beauty_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_concerns" ADD CONSTRAINT "beauty_concerns_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" ADD CONSTRAINT "beauty_item_concerns_item_id_beauty_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "beauty"."beauty_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" ADD CONSTRAINT "beauty_item_concerns_concern_id_beauty_concerns_id_fk" FOREIGN KEY ("concern_id") REFERENCES "beauty"."beauty_concerns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" ADD CONSTRAINT "beauty_items_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" ADD CONSTRAINT "beauty_items_category_id_beauty_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "beauty"."beauty_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" ADD CONSTRAINT "beauty_items_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" ADD CONSTRAINT "beauty_items_brand_id_beauty_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "beauty"."beauty_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" ADD CONSTRAINT "beauty_items_store_id_beauty_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "beauty"."beauty_stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_stores" ADD CONSTRAINT "beauty_stores_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" ADD CONSTRAINT "beauty_waste_history_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" ADD CONSTRAINT "beauty_waste_history_item_id_beauty_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "beauty"."beauty_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" ADD CONSTRAINT "beauty_waste_history_brand_id_beauty_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "beauty"."beauty_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_wishlist" ADD CONSTRAINT "beauty_wishlist_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_wishlist" ADD CONSTRAINT "beauty_wishlist_brand_id_beauty_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "beauty"."beauty_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_wishlist" ADD CONSTRAINT "beauty_wishlist_store_id_beauty_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "beauty"."beauty_stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_beauty_brands_household_name" ON "beauty"."beauty_brands" USING btree ("household_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_beauty_stores_household_name" ON "beauty"."beauty_stores" USING btree ("household_id","name");--> statement-breakpoint
DROP SCHEMA "skincare";
