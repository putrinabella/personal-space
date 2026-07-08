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
} from "@/db/schema";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";

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
    // if (searchParams.get("search"))
    //   filters.push(ilike(foods.foodName, `%${searchParams.get("search")}%`));
    if (searchParams.get("search")) {
      const searchTerm = `%${searchParams.get("search")}%`;
      filters.push(
        or(
          ilike(foods.foodName, searchTerm),
          ilike(restaurants.address, searchTerm), // Ganti 'address' dengan 'name' jika ingin mencari nama restoran
        )!,
      );
    }
    if (searchParams.has("isFavorite"))
      filters.push(
        eq(foods.isFavoriteFood, searchParams.get("isFavorite") === "true"),
      );
    if (searchParams.get("minPrice"))
      filters.push(gte(latestLogCte.price, searchParams.get("minPrice")!));
    if (searchParams.get("maxPrice"))
      filters.push(lte(latestLogCte.price, searchParams.get("maxPrice")!));
    if (searchParams.get("minRating")) {
      filters.push(
        sql`(${latestLogCte.ratingHis} + ${latestLogCte.ratingHer}) / 2.0 >= ${Number(searchParams.get("minRating"))}`,
      );
    }

    const queryBase = db
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
        allLogs: sql<any>`json_agg(
      json_build_object(
        'id', ${foodLogs.id},
        'price', ${foodLogs.price},
        'reviewText', ${foodLogs.reviewText},
        'ratingHis', ${foodLogs.ratingHis},
        'ratingHer', ${foodLogs.ratingHer},
        'dateVisited', ${foodLogs.dateVisited}
      )
    ) FILTER (WHERE ${foodLogs.id} IS NOT NULL)`.as("all_logs"),
        totalLogs: sql<number>`COALESCE(${logCountCte.totalLogs}, 0)`,
      })
      .from(foods)
      .leftJoin(foodLogs, eq(foodLogs.foodId, foods.id))
      .leftJoin(restaurants, eq(restaurants.id, foods.restaurantId))
      .leftJoin(categories, eq(categories.id, foods.categoryId))
      .leftJoin(cuisines, eq(cuisines.id, foods.cuisineId))
      .leftJoin(diningType, eq(diningType.id, foods.diningTypeId))
      .leftJoin(latestLogCte, eq(latestLogCte.foodId, foods.id))
      .leftJoin(logCountCte, eq(logCountCte.foodId, foods.id))
      .where(filters.length ? and(...filters) : undefined)
      .groupBy(
        foods.id,
        restaurants.id,
        categories.id,
        cuisines.id,
        diningType.id,
        latestLogCte.id,
        latestLogCte.foodId,
        latestLogCte.price,
        latestLogCte.reviewText,
        latestLogCte.ratingHis,
        latestLogCte.ratingHer,
        latestLogCte.dateVisited,
        logCountCte.totalLogs,
      );

    if (searchParams.get("random") === "true") {
      const limit = parseInt(searchParams.get("limit") || "1");
      const randomData = await queryBase.orderBy(sql`RANDOM()`).limit(limit);
      return sendStandardResponse(
        randomData,
        "Berhasil mendapatkan menu acak.",
      );
    }
    if (!searchParams.has("page")) {
      const data = await queryBase;
      return sendStandardResponse(
        data,
        "Berhasil mengambil seluruh daftar menu.",
      );
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "12"));

    const [total, items] = await Promise.all([
      db
        .with(latestLogCte, logCountCte)
        .select({ count: sql<number>`count(*)` })
        .from(foods)
        .leftJoin(latestLogCte, eq(latestLogCte.foodId, foods.id))
        .leftJoin(restaurants, eq(restaurants.id, foods.restaurantId))
        .where(filters.length ? and(...filters) : undefined),
      queryBase.limit(perPage).offset((page - 1) * perPage),
    ]);
    return sendPaginatedResponse({
      requestUrl: request.url,
      items,
      totalItems: Number(total[0]?.count || 0),
      page,
      perPage,
      message: "Berhasil mengambil daftar menu ber-pagination.",
    });
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
