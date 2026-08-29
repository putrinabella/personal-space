ALTER TABLE "beauty"."beauty_stores" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "beauty"."beauty_stores" CASCADE;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP CONSTRAINT "beauty_items_store_id_beauty_stores_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_wishlist" DROP CONSTRAINT "beauty_wishlist_store_id_beauty_stores_id_fk";
--> statement-breakpoint
ALTER TABLE "beauty"."beauty_brands" ADD COLUMN "store_link" text;--> statement-breakpoint
ALTER TABLE "beauty"."beauty_items" DROP COLUMN "store_id";--> statement-breakpoint
ALTER TABLE "beauty"."beauty_wishlist" DROP COLUMN "store_id";