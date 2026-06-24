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
