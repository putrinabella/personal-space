CREATE TABLE "beauty"."beauty_item_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_id" uuid NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"price" numeric(15, 2) DEFAULT '0' NOT NULL,
	"purchase_date" timestamp with time zone,
	"expiry_date" timestamp with time zone,
	"date_opened" timestamp with time zone,
	"pao_months" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" DROP CONSTRAINT "beauty_item_concerns_item_id_beauty_items_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" DROP CONSTRAINT "beauty_item_concerns_concern_id_beauty_concerns_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" DROP CONSTRAINT "beauty_waste_history_item_id_beauty_items_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" DROP CONSTRAINT "beauty_waste_history_brand_id_beauty_brands_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_units" ADD CONSTRAINT "beauty_item_units_item_id_beauty_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "beauty"."beauty_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" ADD CONSTRAINT "beauty_item_concerns_item_id_beauty_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "beauty"."beauty_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_item_concerns" ADD CONSTRAINT "beauty_item_concerns_concern_id_beauty_concerns_id_fk" FOREIGN KEY ("concern_id") REFERENCES "beauty"."beauty_concerns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" ADD CONSTRAINT "beauty_waste_history_item_id_beauty_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "beauty"."beauty_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_waste_history" ADD CONSTRAINT "beauty_waste_history_brand_id_beauty_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "beauty"."beauty_brands"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "quantity";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "purchase_date";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "expiry_date";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "date_opened";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "pao_months";