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
    const [sampleFood] = await db
      .insert(schema.foodEntries)
      .values({
        restaurantId: sampleRestaurant.id,
        categoryId: insertedCategories[0].id, // Noodle & Pasta
        cuisineId: insertedCuisines[0].id, // 🚀 Menggunakan hasil return langsung, menghemat 1 query await db.query!
        diningTypeId: insertedDiningTypes[0].id, // 🚀 Menggunakan hasil return langsung, menghemat 1 query await db.query!
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
  } catch (err) {
    console.error("❌ Seeding gagal di tengah jalan:", err);
    throw err; // Lempar ke blok penanganan luar untuk ditutup koneksinya
  } finally {
    console.log("🔌 Memutus aliansi koneksi database...");
    await client.end(); // 🛡️ WAJIB: Menutup koneksi postgres-js agar proses exit bersih!
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
