// src/db/seed.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Hubungkan ke database menggunakan Session Connection URI kamu
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  try {
    console.log("⏳ Menghapus data lama jika ada...");
    // Hapus data dengan urutan yang benar (junction & operational dulu baru lookup)
    await db.delete(schema.foodLogTags);
    await db.delete(schema.foodLogs);
    await db.delete(schema.foods);
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
        { name: "Noodle & Pasta", iconSlug: "noodle" },
        { name: "Rice Dishes", iconSlug: "rice" },
        { name: "Burgers & Steaks", iconSlug: "meat" },
        { name: "Snacks & Desserts", iconSlug: "cake" },
        { name: "Coffee & Drinks", iconSlug: "coffee" },
      ])
      .returning();

    // 2. Seed Cuisines
    const insertedCuisines = await db
      .insert(schema.cuisines)
      .values([
        { name: "Indonesian" },
        { name: "Japanese" },
        { name: "Western" },
        { name: "Korean" },
        { name: "Chinese" },
      ])
      .returning(); // 🆕 Hamba ubah agar mengembalikan data (efisiensi query bawah)

    // 3. Seed Dining Types
    const insertedDiningTypes = await db
      .insert(schema.diningTypes)
      .values([
        { name: "Dine In" },
        { name: "Takeaway" },
        { name: "Delivery (Gofood/Grab)" },
      ])
      .returning(); // 🆕 Hamba ubah agar mengembalikan data (efisiensi query bawah)

    // 4. Seed Tags
    const insertedTags = await db
      .insert(schema.tags)
      .values([
        { name: "Pedas Mantap", bgColor: "#ef4444" },
        { name: "Murah Meriah", bgColor: "#22c55e" },
        { name: "Porsi Kenyang", bgColor: "#eab308" },
        { name: "Hidden Gem", bgColor: "#a855f7" },
        { name: "Tempat Aesthetic", bgColor: "#ec4899" },
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
    const [food] = await db
      .insert(schema.foods)
      .values({
        restaurantId: sampleRestaurant.id,
        categoryId: insertedCategories[0].id,
        cuisineId: insertedCuisines[0].id,
        diningTypeId: insertedDiningTypes[0].id,
        foodName: "Bakmi Ayam Cah Jamur",
        isFavoriteFood: true,
      })
      .returning();

    // 4. Seed Food Log (Transaksi/Kunjungan)
    const [log] = await db
      .insert(schema.foodLogs)
      .values({
        foodId: food.id,
        price: "38500.00",
        ratingHis: 9,
        ratingHer: 8,
        reviewText: "Tekstur mienya kenyal pas, kuahnya gurih gurih nyoy!",
        dateVisited: new Date().toISOString().split("T")[0],
      })
      .returning();

    // 5. Seed Junction Table (Tagging pada log kunjungan)
    await db.insert(schema.foodLogTags).values([
      { foodLogId: log.id, tagId: insertedTags[0].id },
      { foodLogId: log.id, tagId: insertedTags[1].id },
    ]);

    console.log("✅ Seeding selesai dengan sukses!");
  } catch (err) {
    console.error("❌ Seeding gagal:", err);
    throw err;
  } finally {
    await client.end();
  }
}

main();
