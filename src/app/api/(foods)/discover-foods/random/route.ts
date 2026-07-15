import { NextRequest } from "next/server";
import { and, desc, eq, gte, ilike, lte, sql, count, or } from "drizzle-orm";
import { db } from "@/db";
import {
  foods,
  foodLogs,
  restaurants,
  categories,
  cuisines,
  diningType,
} from "@/db/schema/food";
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
    const filters = [];
    if (searchParams.get("restaurantId"))
      filters.push(eq(foods.restaurantId, searchParams.get("restaurantId")!));
    if (searchParams.get("categoryId"))
      filters.push(eq(foods.categoryId, searchParams.get("categoryId")!));
    if (searchParams.get("cuisineId"))
      filters.push(eq(foods.cuisineId, searchParams.get("cuisineId")!));
    if (searchParams.get("diningTypeId"))
      filters.push(eq(foods.diningTypeId, searchParams.get("diningTypeId")!));

    if (searchParams.get("search")) {
      const searchTerm = `%${searchParams.get("search")}%`;
      filters.push(
        or(
          ilike(foods.foodName, searchTerm),
          ilike(restaurants.address, searchTerm),
        )!,
      );
    }

    if (searchParams.has("isFavorite"))
      filters.push(
        eq(foods.isFavoriteFood, searchParams.get("isFavorite") === "true"),
      );
    const queryBuilder = db
      .with(latestLogCte, logCountCte)
      .select({
        id: foods.id,
        foodName: foods.foodName,
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
      .leftJoin(logCountCte, eq(logCountCte.foodId, foods.id))
      .where(filters.length ? and(...filters) : undefined);
    const limit = parseInt(searchParams.get("limit") || "1");
    const data = await queryBuilder.orderBy(sql`RANDOM()`).limit(limit);

    const result = limit === 1 ? (data.length > 0 ? data[0] : null) : data;

    return sendStandardResponse(
      result,
      "Successfully retrieved random menu based on filters.",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
