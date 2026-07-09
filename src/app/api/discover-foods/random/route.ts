import { NextRequest } from "next/server";
import { desc, eq, sql, count } from "drizzle-orm";
import { db } from "@/db";
import {
  foods,
  foodLogs,
  restaurants,
  categories,
  cuisines,
  diningType,
} from "@/db/schema";
import { sendStandardResponse } from "@/lib/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const latestLogCte = db.$with("latest_log").as(
      db
        .selectDistinctOn([foodLogs.foodId], {
          id: foodLogs.id,
          foodId: foodLogs.foodId,
          price: foodLogs.price,
          reviewText: foodLogs.reviewText,
          ratingHis: foodLogs.ratingHis,
          ratingHer: foodLogs.ratingHer,
          dateVisited: foodLogs.dateVisited,
        })
        .from(foodLogs)
        .orderBy(foodLogs.foodId, desc(foodLogs.dateVisited)),
    );

    const logCountCte = db.$with("log_counts").as(
      db
        .select({
          foodId: foodLogs.foodId,
          totalLogs: count(foodLogs.id).as("total_logs"),
        })
        .from(foodLogs)
        .groupBy(foodLogs.foodId),
    );

    const queryBuilder = db
      .with(latestLogCte, logCountCte)
      .select({
        id: foods.id,
        restaurantId: foods.restaurantId,
        categoryId: foods.categoryId,
        cuisineId: foods.cuisineId,
        diningTypeId: foods.diningTypeId,
        foodName: foods.foodName,
        isFavoriteFood: foods.isFavoriteFood,
        isFavoriteDrink: foods.isFavoriteDrink,
        createdAt: foods.createdAt,
        updatedAt: foods.updatedAt,
        restaurant: restaurants,
        category: categories,
        cuisine: cuisines,
        diningType: diningType,
        latestLog: {
          id: latestLogCte.id,
          foodId: latestLogCte.foodId,
          price: latestLogCte.price,
          reviewText: latestLogCte.reviewText,
          ratingHis: latestLogCte.ratingHis,
          ratingHer: latestLogCte.ratingHer,
          dateVisited: latestLogCte.dateVisited,
        },
        totalLogs: sql<number>`COALESCE(${logCountCte.totalLogs}, 0)`,
      })
      .from(foods)
      .leftJoin(restaurants, eq(restaurants.id, foods.restaurantId))
      .leftJoin(categories, eq(categories.id, foods.categoryId))
      .leftJoin(cuisines, eq(cuisines.id, foods.cuisineId))
      .leftJoin(diningType, eq(diningType.id, foods.diningTypeId))
      .leftJoin(latestLogCte, eq(latestLogCte.foodId, foods.id))
      .leftJoin(logCountCte, eq(logCountCte.foodId, foods.id));

    if (!searchParams.has("page")) {
      const limit = parseInt(searchParams.get("limit") || "1");

      const data = await queryBuilder.orderBy(sql`RANDOM()`).limit(limit);

      return sendStandardResponse(
        limit === 1 ? data[0] : data,
        "Berhasil mendapatkan menu acak.",
      );
    }
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
