import { NextRequest } from "next/server";
import { db } from "@/db";
import { foods, foodLogs, foodLogTags } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // A. LOGIKA: GET DETAIL BY ID
    if (id) {
      const item = await db.query.foodLogs.findFirst({
        where: eq(foodLogs.id, id),
        with: {
          food: { with: { restaurant: true, category: true, cuisine: true } },
          tags: { with: { tag: true } },
        },
      });

      return item
        ? sendStandardResponse(item, "Detail log found.")
        : sendStandardResponse(null, "Log not found.", 404, "error");
    }

    // B. LOGIKA: GET ALL TANPA PAGINATION
    if (!searchParams.has("page")) {
      const allLogs = await db.query.foodLogs.findMany({
        with: {
          food: { with: { restaurant: true, category: true } },
          tags: { with: { tag: true } },
        },
        orderBy: [desc(foodLogs.dateVisited)],
      });

      return sendStandardResponse(allLogs, "Successfully retrieved food logs.");
    }

    // C. LOGIKA: GET WITH PAGINATION
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    // Menggunakan Promise.all untuk mengambil data dan count secara paralel
    const [totalQuery, logs] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(foodLogs),
      db.query.foodLogs.findMany({
        limit: perPage,
        offset: offset,
        with: {
          food: { with: { restaurant: true, category: true } },
          tags: { with: { tag: true } },
        },
        orderBy: [desc(foodLogs.dateVisited)],
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: logs,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: "Successfully retrieved food logs (paginated).",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return sendStandardResponse(null, msg, 500, "error");
  }
}
// 2. POST: Create with Transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Gunakan body langsung untuk akses isNewFood jika destructuring di atas ragu
    const isNewFood = !!body.isNewFood;
    const formData = body; // Ambil semua data termasuk yang di dalamnya

    const result = await db.transaction(async (tx) => {
      let activeFoodId = formData.foodId;

      // Gunakan variabel isNewFood yang sudah dipastikan boolean
      if (isNewFood) {
        const [newFood] = await tx
          .insert(foods)
          .values({
            restaurantId: formData.restaurantId,
            categoryId: formData.categoryId,
            cuisineId: formData.cuisineId,
            diningTypeId: formData.diningTypeId,
            foodName: formData.foodName,
            isFavoriteFood: !!formData.isFavoriteFood,
            isFavoriteDrink: !!formData.isFavoriteDrink,
          })
          .returning();
        activeFoodId = newFood.id;
      }

      if (!activeFoodId) {
        throw new Error(
          "Food ID tidak ditemukan. Makanan gagal dibuat/dipilih.",
        );
      }

      const [newLog] = await tx
        .insert(foodLogs)
        .values({
          foodId: activeFoodId,
          price: String(formData.price),
          ratingHis: Number(formData.ratingHis),
          ratingHer: Number(formData.ratingHer),
          reviewText: formData.reviewText,
          dateVisited:
            formData.dateVisited || new Date().toISOString().split("T")[0],
        })
        .returning();

      return newLog;
    });

    return sendStandardResponse(result, "Log & Food saved successfully.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { foodId, price, ratingHis, ratingHer, reviewText, tagIds } = body;

//     const result = await db.transaction(async (tx) => {
//       const [newLog] = await tx
//         .insert(foodLogs)
//         .values({
//           foodId,
//           price: String(price),
//           ratingHis,
//           ratingHer,
//           reviewText,
//           dateVisited: new Date().toISOString().split("T")[0], // Force today
//         })
//         .returning();

//       if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
//         await tx
//           .insert(foodLogTags)
//           .values(
//             tagIds.map((tId: string) => ({ foodLogId: newLog.id, tagId: tId })),
//           );
//       }
//       return newLog;
//     });

//     return sendStandardResponse(result, "Log saved successfully.", 201);
//   } catch (err: any) {
//     return sendStandardResponse(null, err.message, 500, "error");
//   }
// }

// 3. PUT: Update log AND Sync Tags (The "Fix")
export async function PUT(request: NextRequest) {
  try {
    const { id, price, ratingHis, ratingHer, reviewText, tagIds } =
      await request.json();

    if (!id) return sendStandardResponse(null, "ID is required.", 400, "error");

    const result = await db.transaction(async (tx) => {
      // 1. Update the log
      const [updated] = await tx
        .update(foodLogs)
        .set({ price: String(price), ratingHis, ratingHer, reviewText })
        .where(eq(foodLogs.id, id))
        .returning();

      // 2. Sync Tags: Remove old, add new
      if (tagIds !== undefined) {
        await tx.delete(foodLogTags).where(eq(foodLogTags.foodLogId, id));
        if (tagIds.length > 0) {
          await tx
            .insert(foodLogTags)
            .values(
              tagIds.map((tId: string) => ({ foodLogId: id, tagId: tId })),
            );
        }
      }
      return updated;
    });

    return sendStandardResponse(result, "Log and tags updated successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

// 4. DELETE: Standard delete
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return sendStandardResponse(null, "ID is required.", 400, "error");

    // Cascading delete in DB schema handles foodLogTags automatically
    await db.delete(foodLogs).where(eq(foodLogs.id, id));
    return sendStandardResponse(null, "Log deleted successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
