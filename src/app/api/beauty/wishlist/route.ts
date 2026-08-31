import { db } from "@/db";
import {
  beautyWishlist,
  beautyItems,
  beautyItemUnits,
  beautyBrands,
  beautyCategories,
} from "@/db/schema/beauty";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq, ilike, desc, and, count } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : null;
    const perPage = Number(searchParams.get("per_page") ?? 15);
    const search = searchParams.get("search");
    const priority = searchParams.get("priority");
    const brandId = searchParams.get("brandId");
    const categoryId = searchParams.get("categoryId");

    const filters = [eq(beautyWishlist.householdId, householdId)];

    if (id) filters.push(eq(beautyWishlist.id, id));
    if (search) filters.push(ilike(beautyWishlist.name, `%${search}%`));
    if (priority) filters.push(eq(beautyWishlist.priority, priority as any));
    if (brandId) filters.push(eq(beautyWishlist.brandId, brandId));
    if (categoryId) filters.push(eq(beautyWishlist.categoryId, categoryId));

    const buildQuery = (isPaginated: boolean = false) => {
      let query = db
        .select({
          wishlist: beautyWishlist,
          brand: beautyBrands,
          category: beautyCategories,
        })
        .from(beautyWishlist)
        .leftJoin(beautyBrands, eq(beautyBrands.id, beautyWishlist.brandId))
        .leftJoin(
          beautyCategories,
          eq(beautyCategories.id, beautyWishlist.categoryId),
        )
        .where(and(...filters))
        .orderBy(desc(beautyWishlist.createdAt)) as any;

      if (isPaginated && page) {
        query = query.limit(perPage).offset((page - 1) * perPage);
      }
      return query;
    };

    const rawWishlist = await buildQuery(Boolean(page));

    const formattedWishlist = rawWishlist.map((row: any) => ({
      ...row.wishlist,
      brand: row.brand,
      category: row.category,
    }));

    if (id) {
      if (formattedWishlist.length === 0) {
        return sendStandardResponse(
          null,
          "Wishlist item not found",
          404,
          "error",
        );
      }
      return sendStandardResponse(formattedWishlist[0], "Success");
    }

    if (!page) return sendStandardResponse(formattedWishlist, "Success");

    const [total] = await db
      .select({ count: count() })
      .from(beautyWishlist)
      .where(and(...filters));

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: formattedWishlist,
      totalItems: total?.count ?? 0,
      page,
      perPage,
      message: "Success",
    });
  } catch (error) {
    return sendStandardResponse(
      null,
      error instanceof Error ? error.message : "Internal Server Error",
      500,
      "error",
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { householdId, userId } = await getHouseholdAuth();
    const body = await request.json();

    // Skenario 1: Membeli item dari wishlist (Pindah ke beautyItems & beautyItemUnits, lalu hapus dari wishlist)
    const isPurchased = !!body.isPurchased;
    const wishlistId = body.wishlistId;

    if (isPurchased) {
      if (!wishlistId) {
        return sendStandardResponse(
          null,
          "Wishlist ID is required for purchase.",
          400,
          "error",
        );
      }

      const result = await db.transaction(async (tx) => {
        // Ambil data wishlist
        const [wishlistItem] = await tx
          .select()
          .from(beautyWishlist)
          .where(
            and(
              eq(beautyWishlist.id, wishlistId),
              eq(beautyWishlist.householdId, householdId),
            ),
          );

        if (!wishlistItem) {
          throw new Error("Wishlist item not found.");
        }

        // Buat master item baru di beautyItems
        const [newItem] = await tx
          .insert(beautyItems)
          .values({
            householdId,
            categoryId: body.categoryId || wishlistItem.categoryId, // Fallback ke categoryId wishlist jika tidak diisi saat pembelian
            createdById: userId,
            brandId: wishlistItem.brandId,
            name: wishlistItem.name,
            minStock: body.minStock ?? 1,
            rating: body.rating ? Number(body.rating) : null,
            notes: body.notes || wishlistItem.reason || null,
          })
          .returning();

        // Buat unit fisik baru di beautyItemUnits
        const [newUnit] = await tx
          .insert(beautyItemUnits)
          .values({
            itemId: newItem.id,
            status: body.status || "active",
            price: body.price
              ? String(body.price)
              : String(wishlistItem.estimatedPrice),
            purchaseDate: body.purchaseDate
              ? new Date(body.purchaseDate)
              : new Date(),
            expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
            dateOpened: body.dateOpened ? new Date(body.dateOpened) : null,
            paoMonths: body.paoMonths ? Number(body.paoMonths) : null,
          })
          .returning();

        // Hapus dari wishlist (hard delete)
        await tx
          .delete(beautyWishlist)
          .where(eq(beautyWishlist.id, wishlistId));

        return { newItem, newUnit };
      });

      return sendStandardResponse(
        result,
        "Wishlist item purchased and successfully moved to inventory.",
        201,
      );
    }

    // Skenario 2: Tambah item biasa ke wishlist
    const [newItem] = await db
      .insert(beautyWishlist)
      .values({
        householdId,
        name: body.name,
        brandId: body.brandId || null,
        categoryId: body.categoryId || null,
        estimatedPrice: body.estimatedPrice ? String(body.estimatedPrice) : "0",
        storeLink: body.storeLink || null,
        priority: body.priority || "Medium",
        reason: body.reason || null,
      })
      .returning();

    return sendStandardResponse(
      newItem,
      "Wishlist item added successfully.",
      201,
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const body = await request.json();
    const {
      id,
      name,
      brandId,
      categoryId,
      estimatedPrice,
      storeLink,
      priority,
      reason,
    } = body;

    if (!id) {
      return sendStandardResponse(
        null,
        "Wishlist ID is required.",
        400,
        "error",
      );
    }

    const [updatedItem] = await db
      .update(beautyWishlist)
      .set({
        ...(name && { name }),
        ...(brandId !== undefined && { brandId }),
        ...(categoryId !== undefined && { categoryId }),
        ...(estimatedPrice !== undefined && {
          estimatedPrice: String(estimatedPrice),
        }),
        ...(storeLink !== undefined && { storeLink }),
        ...(priority && { priority }),
        ...(reason !== undefined && { reason }),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(beautyWishlist.id, id),
          eq(beautyWishlist.householdId, householdId),
        ),
      )
      .returning();

    if (!updatedItem) {
      return sendStandardResponse(
        null,
        "Wishlist item not found.",
        404,
        "error",
      );
    }

    return sendStandardResponse(
      updatedItem,
      "Wishlist item updated successfully.",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendStandardResponse(
        null,
        "Wishlist ID is required.",
        400,
        "error",
      );
    }

    const [deletedItem] = await db
      .delete(beautyWishlist)
      .where(
        and(
          eq(beautyWishlist.id, id),
          eq(beautyWishlist.householdId, householdId),
        ),
      )
      .returning();

    if (!deletedItem) {
      return sendStandardResponse(
        null,
        "Wishlist item not found.",
        404,
        "error",
      );
    }

    return sendStandardResponse(
      deletedItem,
      "Wishlist item deleted successfully.",
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
