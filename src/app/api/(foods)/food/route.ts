import { NextRequest } from "next/server";
import { db } from "@/db";
import { foods } from "@/db/schema/food";
import { eq, sql, desc } from "drizzle-orm";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { validate as validateUuid } from "uuid";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const restaurantId = searchParams.get("restaurantId");
    if (restaurantId && !validateUuid(restaurantId)) {
      return sendStandardResponse(
        null,
        "Format ID Restoran tidak valid.",
        400,
        "error",
      );
    }
    if (id) {
      const item = await db.query.foods.findFirst({
        where: eq(foods.id, id),
        with: { restaurant: true, category: true, cuisine: true, logs: true },
      });
      return item
        ? sendStandardResponse(item, "Detail menu found.")
        : sendStandardResponse(null, "Menu not found.", 404, "error");
    }
    if (!searchParams.has("page")) {
      const data = await db.query.foods.findMany({
        where: restaurantId ? eq(foods.restaurantId, restaurantId) : undefined,
        with: { restaurant: true, category: true, cuisine: true, logs: true },
        orderBy: [desc(foods.foodName)],
      });
      return sendStandardResponse(
        data,
        "Berhasil mengambil seluruh daftar menu.",
      );
    }
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
    const offset = (page - 1) * perPage;

    const [totalQuery, items] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as integer)` })
        .from(foods)
        .where(restaurantId ? eq(foods.restaurantId, restaurantId) : undefined),
      db.query.foods.findMany({
        where: restaurantId ? eq(foods.restaurantId, restaurantId) : undefined,
        limit: perPage,
        offset: offset,
        with: { restaurant: true, category: true, cuisine: true, logs: true },
        orderBy: [desc(foods.foodName)],
      }),
    ]);

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: items,
      totalItems: totalQuery[0]?.count || 0,
      page,
      perPage,
      message: "Berhasil mengambil daftar menu ber-pagination.",
    });
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurantId,
      categoryId,
      cuisineId,
      diningTypeId,
      foodName,
      isFavoriteFood,
      isFavoriteDrink,
    } = body;

    const [newFood] = await db
      .insert(foods)
      .values({
        restaurantId,
        categoryId,
        cuisineId,
        diningTypeId,
        foodName,
        isFavoriteFood: !!isFavoriteFood,
        isFavoriteDrink: !!isFavoriteDrink,
      })
      .returning();

    return sendStandardResponse(
      newFood,
      "Menu baru berhasil ditambahkan ke master.",
      201,
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { id, isFavoriteFood, isFavoriteDrink } = await request.json();

    if (!id)
      return sendStandardResponse(null, "ID menu diperlukan.", 400, "error");

    const [updated] = await db
      .update(foods)
      .set({ isFavoriteFood, isFavoriteDrink })
      .where(eq(foods.id, id))
      .returning();

    return sendStandardResponse(updated, "Status menu berhasil diperbarui.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
