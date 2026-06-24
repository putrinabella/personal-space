import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    // Run parallel queries to speed up server delivery execution speeds
    const [
      allCategories,
      allCuisines,
      allDiningTypes,
      allTags,
      allRestaurants,
    ] = await Promise.all([
      db.query.categories.findMany(),
      db.query.cuisines.findMany(),
      db.query.diningTypes.findMany(),
      db.query.tags.findMany(),
      db.query.restaurants.findMany(),
    ]);

    return NextResponse.json({
      categories: allCategories,
      cuisines: allCuisines,
      diningTypes: allDiningTypes,
      tags: allTags,
      restaurants: allRestaurants,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
