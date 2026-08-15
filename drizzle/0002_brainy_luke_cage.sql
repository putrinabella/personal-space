CREATE SCHEMA "skincare";
--> statement-breakpoint
CREATE TABLE "skincare"."skincare_categories" (
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
CREATE TABLE "skincare"."skincare_concerns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "skincare"."skincare_item_concerns" (
	"item_id" uuid NOT NULL,
	"concern_id" uuid NOT NULL,
	CONSTRAINT "skincare_item_concerns_item_id_concern_id_pk" PRIMARY KEY("item_id","concern_id")
);
--> statement-breakpoint
CREATE TABLE "skincare"."skincare_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"brand" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"store" text,
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
CREATE TABLE "skincare"."skincare_waste_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"item_id" uuid,
	"name" text NOT NULL,
	"brand" text NOT NULL,
	"price" numeric(15, 2) NOT NULL,
	"expired_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "skincare"."skincare_wishlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"household_id" uuid NOT NULL,
	"name" text NOT NULL,
	"brand" text NOT NULL,
	"estimated_price" numeric(15, 2) DEFAULT '0' NOT NULL,
	"store_link" text,
	"priority" text DEFAULT 'Medium' NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "skincare"."skincare_categories" ADD CONSTRAINT "skincare_categories_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_categories" ADD CONSTRAINT "skincare_categories_parent_category_fk" FOREIGN KEY ("parent_id") REFERENCES "skincare"."skincare_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_concerns" ADD CONSTRAINT "skincare_concerns_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_item_concerns" ADD CONSTRAINT "skincare_item_concerns_item_id_skincare_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "skincare"."skincare_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_item_concerns" ADD CONSTRAINT "skincare_item_concerns_concern_id_skincare_concerns_id_fk" FOREIGN KEY ("concern_id") REFERENCES "skincare"."skincare_concerns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_items" ADD CONSTRAINT "skincare_items_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_items" ADD CONSTRAINT "skincare_items_category_id_skincare_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "skincare"."skincare_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_items" ADD CONSTRAINT "skincare_items_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_waste_history" ADD CONSTRAINT "skincare_waste_history_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_waste_history" ADD CONSTRAINT "skincare_waste_history_item_id_skincare_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "skincare"."skincare_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skincare"."skincare_wishlist" ADD CONSTRAINT "skincare_wishlist_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "finance"."households"("id") ON DELETE no action ON UPDATE no action;