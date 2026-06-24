// src/db/seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Hubungkan ke database menggunakan Session Connection URI kamu
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log("⏳ Menghapus data lama jika ada...");
  // Hapus data dengan urutan yang benar (junction & operational dulu baru lookup)
  await db.delete(schema.foodEntryTags);
  await db.delete(schema.foodEntries);
  await db.delete(schema.restaurants);
  await db.delete(schema.categories);
  await db.delete(schema.cuisines);
  await db.delete(schema.diningTypes);
  await db.delete(schema.tags);

  console.log("🌱 Mulai proses seeding data lookup...");

  // 1. Seed Categories
  const insertedCategories = await db
    .insert(schema.categories)
    .values([
      { name: "Noodle & Pasta", iconSlug: "noodle" }, // 👈 Ganti icon_slug menjadi iconSlug
      { name: "Rice Dishes", iconSlug: "rice" }, // 👈 Ganti icon_slug menjadi iconSlug
      { name: "Burgers & Steaks", iconSlug: "meat" }, // 👈 Ganti icon_slug menjadi iconSlug
      { name: "Snacks & Desserts", iconSlug: "cake" }, // 👈 Ganti icon_slug menjadi iconSlug
      { name: "Coffee & Drinks", iconSlug: "coffee" }, // 👈 Ganti icon_slug menjadi iconSlug
    ])
    .returning();

  // 2. Seed Cuisines
  await db
    .insert(schema.cuisines)
    .values([
      { name: "Indonesian" },
      { name: "Japanese" },
      { name: "Western" },
      { name: "Korean" },
      { name: "Chinese" },
    ]);

  // 3. Seed Dining Types
  await db
    .insert(schema.diningTypes)
    .values([
      { name: "Dine In" },
      { name: "Takeaway" },
      { name: "Delivery (Gofood/Grab)" },
    ]);

  // 4. Seed Tags
  const insertedTags = await db
    .insert(schema.tags)
    .values([
      { name: "Pedas Mantap", bgColor: "#ef4444" }, // 👈 Ganti bg_color menjadi bgColor
      { name: "Murah Meriah", bgColor: "#22c55e" }, // 👈 Ganti bg_color menjadi bgColor
      { name: "Porsi Kenyang", bgColor: "#eab308" }, // 👈 Ganti bg_color menjadi bgColor
      { name: "Hidden Gem", bgColor: "#a855f7" }, // 👈 Ganti bg_color menjadi bgColor
      { name: "Tempat Aesthetic", bgColor: "#ec4899" }, // 👈 Ganti bg_color menjadi bgColor
    ])
    .returning();

  // 5. Seed 1 Contoh Restaurant untuk testing awal
  const [sampleRestaurant] = await db
    .insert(schema.restaurants)
    .values({
      name: "Bakmie GM Thamrin",
      address: "Jl. M.H. Thamrin No.11, Jakarta Pusat",
      googleMapsUrl: "https://maps.google.com",
      isFavoriteRestaurant: true,
    })
    .returning();

  // 6. Seed 1 Contoh Makanan beserta Junction Tag-nya
  const [sampleFood] = await db
    .insert(schema.foodEntries)
    .values({
      restaurantId: sampleRestaurant.id,
      categoryId: insertedCategories[0].id, // Noodle & Pasta
      cuisineId: (await db.query.cuisines.findFirst())!.id,
      diningTypeId: (await db.query.diningTypes.findFirst())!.id,
      foodName: "Bakmi Ayam Cah Jamur",
      price: "38500.00",
      ratingOverall: 9,
      reviewText: "Tekstur mienya kenyal pas, kuahnya gurih gurih nyoy!",
      isFavoriteFood: true,
    })
    .returning();

  // Sambungkan makanan ke Tag "Porsi Kenyang" dan "Murah Meriah"
  await db.insert(schema.foodEntryTags).values([
    { foodEntryId: sampleFood.id, tagId: insertedTags[1].id },
    { foodEntryId: sampleFood.id, tagId: insertedTags[2].id },
  ]);

  console.log("✅ Seeding selesai dengan sukses!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding gagal:", err);
  process.exit(1);
});
