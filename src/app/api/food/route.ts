// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { foodEntries, foodEntryTags } from "@/db/schema";
// import { and, ne, lte } from "drizzle-orm";

// // 🔍 GET: Fetch entries with advanced recommendation logic
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const excludeCategoryId = searchParams.get("excludeCategory"); // e.g. ?excludeCategory=uuid
//     const maxPrice = searchParams.get("maxPrice"); // e.g. ?maxPrice=50000
//     const shuffle = searchParams.get("shuffle") === "true"; // e.g. ?shuffle=true

//     const conditions = [];

//     if (excludeCategoryId) {
//       conditions.push(ne(foodEntries.categoryId, excludeCategoryId));
//     }
//     if (maxPrice) {
//       conditions.push(lte(foodEntries.price, maxPrice));
//     }

//     // Relational read query fetches linked entities cleanly without manual SQL joins
//     const entries = await db.query.foodEntries.findMany({
//       where: conditions.length > 0 ? and(...conditions) : undefined,
//       with: {
//         restaurant: true,
//         category: true,
//         cuisine: true,
//         diningType: true,
//         tags: {
//           with: { tag: true },
//         },
//       },
//       orderBy: (entries, { desc }) => [desc(entries.dateVisited)],
//     });

//     // "What should I eat today?" Random Generator Logic
//     if (shuffle && entries.length > 0) {
//       const randomPick = entries[Math.floor(Math.random() * entries.length)];
//       return NextResponse.json(randomPick);
//     }

//     return NextResponse.json(entries);
//   } catch (err: unknown) {
//     const errorMessage =
//       err instanceof Error ? err.message : "Unknown database error";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

// // 📝 POST: Create an entry and assign its multi-tags atomically
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const {
//       restaurantId,
//       categoryId,
//       cuisineId,
//       diningTypeId,
//       foodName,
//       price,
//       reviewText,
//       ratingOverall,
//       ratingTaste,
//       ratingPortion,
//       ratingValue,
//       ratingAtmosphere,
//       isFavoriteFood,
//       isFavoriteDrink,
//       tagIds,
//     } = body;

//     // Database transaction guarantees that if adding tags fails, the entry isn't orphaned
//     const result = await db.transaction(async (tx) => {
//       const [newEntry] = await tx
//         .insert(foodEntries)
//         .values({
//           restaurantId,
//           categoryId,
//           cuisineId,
//           diningTypeId,
//           foodName,
//           price: String(price), // Numeric fields are string-protected to prevent float rounding errors
//           reviewText,
//           ratingOverall,
//           ratingTaste,
//           ratingPortion,
//           ratingValue,
//           ratingAtmosphere,
//           isFavoriteFood,
//           isFavoriteDrink,
//         })
//         .returning();

//       if (tagIds && tagIds.length > 0) {
//         const structuralTags = tagIds.map((id: string) => ({
//           foodEntryId: newEntry.id,
//           tagId: id,
//         }));
//         await tx.insert(foodEntryTags).values(structuralTags);
//       }

//       return newEntry;
//     });

//     return NextResponse.json({ success: true, data: result }, { status: 201 });
//   } catch (err: unknown) {
//     const errorMessage =
//       err instanceof Error ? err.message : "Unknown database error";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { foodEntries, foodEntryTags } from "@/db/schema";
import { and, ne, lte, eq } from "drizzle-orm";

// ==========================================
// 1. READ (GET): Ambil Semua / Filter Data
// ==========================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeCategoryId = searchParams.get("excludeCategory");
    const maxPrice = searchParams.get("maxPrice");

    const conditions = [];
    if (excludeCategoryId)
      conditions.push(ne(foodEntries.categoryId, excludeCategoryId));
    if (maxPrice) conditions.push(lte(foodEntries.price, maxPrice));

    const entries = await db.query.foodEntries.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: { restaurant: true, category: true, tags: { with: { tag: true } } },
      orderBy: (entries, { desc }) => [desc(entries.dateVisited)],
    });

    return NextResponse.json(entries);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ==========================================
// 2. CREATE (POST): Tambah Makanan Baru
// ==========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurantId,
      categoryId,
      cuisineId,
      diningTypeId,
      foodName,
      price,
      ratingOverall,
      tagIds,
    } = body;

    const result = await db.transaction(async (tx) => {
      const [newEntry] = await tx
        .insert(foodEntries)
        .values({
          restaurantId,
          categoryId,
          cuisineId,
          diningTypeId,
          foodName,
          price: String(price),
          ratingOverall,
        })
        .returning();

      if (tagIds && tagIds.length > 0) {
        const structuralTags = tagIds.map((id: string) => ({
          foodEntryId: newEntry.id,
          tagId: id,
        }));
        await tx.insert(foodEntryTags).values(structuralTags);
      }
      return newEntry;
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Insert error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ==========================================
// 3. UPDATE (PUT): Edit Data Makanan
// ==========================================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, foodName, price, ratingOverall } = body; // Ambil ID data yang mau diedit

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const [updatedEntry] = await db
      .update(foodEntries)
      .set({
        foodName,
        price: price ? String(price) : undefined,
        ratingOverall,
      })
      .where(eq(foodEntries.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updatedEntry });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Update error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE (DELETE): Hapus Makanan
// ==========================================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Ambil ?id=UUID dari URL

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await db.delete(foodEntries).where(eq(foodEntries.id, id));

    return NextResponse.json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Delete error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
