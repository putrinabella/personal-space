CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE SCHEMA "food";
--> statement-breakpoint
CREATE SCHEMA "finance";
--> statement-breakpoint
CREATE TABLE "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food"."categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "food"."cuisines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "cuisines_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "food"."dining_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "dining_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "food"."food_log_tags" (
	"food_log_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "food_log_tags_food_log_id_tag_id_pk" PRIMARY KEY("food_log_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "food"."food_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"food_id" uuid NOT NULL,
	"date_visited" date DEFAULT now() NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"review_text" text,
	"rating_his" integer,
	"rating_her" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food"."foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"restaurant_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"cuisine_id" uuid NOT NULL,
	"dining_type_id" uuid NOT NULL,
	"food_name" text NOT NULL,
	"is_favorite_food" boolean DEFAULT false NOT NULL,
	"is_favorite_drink" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "food"."restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid,
	"name" text NOT NULL,
	"address" text,
	"google_maps_url" text,
	"is_favorite_restaurant" boolean DEFAULT false NOT NULL,
	"is_cafe" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "food"."tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"bg_color" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "finance"."pocket_transfers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"from_pocket_id" uuid NOT NULL,
	"to_pocket_id" uuid NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance"."pockets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'general' NOT NULL,
	"balance" numeric(15, 2) DEFAULT '0' NOT NULL,
	"is_auto_allocation_active" boolean DEFAULT false,
	"monthly_amount" numeric(15, 2),
	"allocation_day" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance"."transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"pocket_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"type" text NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finance"."types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"icon_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "food"."food_log_tags" ADD CONSTRAINT "food_log_tags_food_log_id_food_logs_id_fk" FOREIGN KEY ("food_log_id") REFERENCES "food"."food_logs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."food_log_tags" ADD CONSTRAINT "food_log_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "food"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."food_logs" ADD CONSTRAINT "food_logs_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "food"."foods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."foods" ADD CONSTRAINT "foods_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "food"."restaurants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."foods" ADD CONSTRAINT "foods_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "food"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."foods" ADD CONSTRAINT "foods_cuisine_id_cuisines_id_fk" FOREIGN KEY ("cuisine_id") REFERENCES "food"."cuisines"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."foods" ADD CONSTRAINT "foods_dining_type_id_dining_types_id_fk" FOREIGN KEY ("dining_type_id") REFERENCES "food"."dining_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food"."restaurants" ADD CONSTRAINT "restaurants_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."pocket_transfers" ADD CONSTRAINT "pocket_transfers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."pocket_transfers" ADD CONSTRAINT "pocket_transfers_from_pocket_id_pockets_id_fk" FOREIGN KEY ("from_pocket_id") REFERENCES "finance"."pockets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."pocket_transfers" ADD CONSTRAINT "pocket_transfers_to_pocket_id_pockets_id_fk" FOREIGN KEY ("to_pocket_id") REFERENCES "finance"."pockets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."pockets" ADD CONSTRAINT "pockets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."transactions" ADD CONSTRAINT "transactions_pocket_id_pockets_id_fk" FOREIGN KEY ("pocket_id") REFERENCES "finance"."pockets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."transactions" ADD CONSTRAINT "transactions_category_id_types_id_fk" FOREIGN KEY ("category_id") REFERENCES "finance"."types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."types" ADD CONSTRAINT "types_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;