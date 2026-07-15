import { NextRequest } from "next/server";
import { db } from "@/db";
import { foods, foodLogs, foodLogTags } from "@/db/schema/food";
import { eq, desc, and, sql } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;
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
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isNewFood = !!body.isNewFood;
    const formData = body; // Ambil semua data termasuk yang di dalamnya

    const result = await db.transaction(async (tx) => {
      let activeFoodId = formData.foodId;
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

export async function PUT(request: NextRequest) {
  try {
    const { id, price, ratingHis, ratingHer, reviewText, tagIds } =
      await request.json();

    if (!id) return sendStandardResponse(null, "ID is required.", 400, "error");

    const result = await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(foodLogs)
        .set({ price: String(price), ratingHis, ratingHer, reviewText })
        .where(eq(foodLogs.id, id))
        .returning();
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
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return sendStandardResponse(null, "ID is required.", 400, "error");
    await db.delete(foodLogs).where(eq(foodLogs.id, id));
    return sendStandardResponse(null, "Log deleted successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
