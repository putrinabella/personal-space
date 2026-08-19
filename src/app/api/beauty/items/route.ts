import { db } from "@/db";
import {
  beautyItems,
  beautyCategories,
  beautyBrands,
  beautyStores,
  beautyItemConcerns,
  beautyConcerns,
} from "@/db/schema/beauty";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import {
  eq,
  ilike,
  isNull,
  and,
  desc,
  count,
  lte,
  gte,
  sql,
  inArray,
} from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const page = Number(searchParams.get("page"));
    const perPage = Number(searchParams.get("per_page") ?? 15);
    const search = searchParams.get("search");

    // Filter Parameter Tambahan
    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");
    const storeId = searchParams.get("storeId");
    const status = searchParams.get("status"); // active, backup, finished, discarded
    const concernId = searchParams.get("concernId"); // Filter berdasarkan skin concern
    const expiryWindow = searchParams.get("expiryWindow"); // "expiring_this_month", "safe"
    const stockStatus = searchParams.get("stockStatus"); // "out_of_stock", "low_stock"

    const filters = [eq(beautyItems.householdId, householdId)];
    filters.push(isNull(beautyItems.deletedAt));

    if (id) {
      filters.push(eq(beautyItems.id, id));
    }

    if (search) {
      filters.push(ilike(beautyItems.name, `%${search}%`));
    }

    if (categoryId) {
      filters.push(eq(beautyItems.categoryId, categoryId));
    }

    if (brandId) {
      filters.push(eq(beautyItems.brandId, brandId));
    }

    if (storeId) {
      filters.push(eq(beautyItems.storeId, storeId));
    }

    if (status) {
      filters.push(eq(beautyItems.status, status as any));
    }

    // Filter berdasarkan Stock Status
    if (stockStatus === "out_of_stock") {
      filters.push(eq(beautyItems.quantity, 0));
    } else if (stockStatus === "low_stock") {
      filters.push(sql`${beautyItems.quantity} <= ${beautyItems.minStock}`);
    }

    // Filter berdasarkan Expiry Window (Bulan Ini)
    // Filter berdasarkan Expiry Window (Bulan Ini)
    if (expiryWindow === "expiring_this_month") {
      const now = new Date();
      // Bungkus dengan new Date() agar tipe datanya sesuai dengan timestamp column
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
      );

      filters.push(
        gte(beautyItems.expiryDate, startOfMonth),
        lte(beautyItems.expiryDate, endOfMonth),
      );
    }

    // Filter khusus relasi Concern (jika ada concernId)
    let itemIdsWithConcern: string[] = [];
    if (concernId) {
      const matchedConcerns = await db
        .select({ itemId: beautyItemConcerns.itemId })
        .from(beautyItemConcerns)
        .where(eq(beautyItemConcerns.concernId, concernId));
      itemIdsWithConcern = matchedConcerns.map((c) => c.itemId);
      if (itemIdsWithConcern.length > 0) {
        filters.push(inArray(beautyItems.id, itemIdsWithConcern));
      } else {
        // Jika tidak ada item yang match dengan concern, pastikan return kosong
        filters.push(
          eq(beautyItems.id, "00000000-0000-0000-0000-000000000000"),
        );
      }
    }

    // Helper query dasar dengan relasi (Brand, Store, Category, Concerns)
    const buildQuery = (isPaginated: boolean = false) => {
      let query = db
        .select({
          item: beautyItems,
          category: beautyCategories,
          brand: beautyBrands,
          store: beautyStores,
        })
        .from(beautyItems)
        .leftJoin(
          beautyCategories,
          eq(beautyCategories.id, beautyItems.categoryId),
        )
        .leftJoin(beautyBrands, eq(beautyBrands.id, beautyItems.brandId))
        .leftJoin(beautyStores, eq(beautyStores.id, beautyItems.storeId))
        .where(and(...filters))
        .orderBy(desc(beautyItems.createdAt)) as any;

      if (isPaginated && page) {
        const offset = (page - 1) * perPage;
        query = query.limit(perPage).offset(offset);
      }

      return query;
    };

    // Jika mencari berdasarkan ID spesifik
    if (id) {
      const rawResult = await buildQuery(false);
      const matched = rawResult.find((row: any) => row.item.id === id);

      if (!matched) {
        return sendStandardResponse(
          null,
          "Beauty item not found.",
          404,
          "error",
        );
      }

      // Ambil relasi concerns untuk item ini
      const concerns = await db
        .select({ concern: beautyConcerns })
        .from(beautyItemConcerns)
        .innerJoin(
          beautyConcerns,
          eq(beautyConcerns.id, beautyItemConcerns.concernId),
        )
        .where(eq(beautyItemConcerns.itemId, id));

      const formattedItem = {
        ...matched.item,
        category: matched.category,
        brand: matched.brand,
        store: matched.store,
        concerns: concerns.map((c) => c.concern),
      };

      return sendStandardResponse(
        formattedItem,
        "Beauty item retrieved successfully.",
      );
    }

    // Eksekusi untuk list (dengan atau tanpa pagination)
    const rawItems = await buildQuery(Boolean(page));

    // Format struktur data agar melampirkan relasi dengan rapi (termasuk concerns)
    const itemIds = rawItems.map((r: any) => r.item.id);
    let allConcernsMap: Record<string, any[]> = {};

    if (itemIds.length > 0) {
      const allItemConcerns = await db
        .select({
          itemId: beautyItemConcerns.itemId,
          concern: beautyConcerns,
        })
        .from(beautyItemConcerns)
        .innerJoin(
          beautyConcerns,
          eq(beautyConcerns.id, beautyItemConcerns.concernId),
        )
        .where(inArray(beautyItemConcerns.itemId, itemIds));

      allConcernsMap = allItemConcerns.reduce((acc: any, curr) => {
        if (!acc[curr.itemId]) acc[curr.itemId] = [];
        acc[curr.itemId].push(curr.concern);
        return acc;
      }, {});
    }

    const formattedItems = rawItems.map((row: any) => ({
      ...row.item,
      category: row.category,
      brand: row.brand,
      store: row.store,
      concerns: allConcernsMap[row.item.id] || [],
    }));

    if (!page) {
      return sendStandardResponse(
        formattedItems,
        "Beauty items list retrieved successfully.",
      );
    }

    const [totalResult] = await db
      .select({ count: count() })
      .from(beautyItems)
      .where(and(...filters));

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: formattedItems,
      totalItems: totalResult?.count ?? 0,
      page,
      perPage,
      message: "Beauty items list retrieved successfully.",
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
    const {
      categoryId,
      brandId,
      storeId,
      name,
      status,
      quantity,
      minStock,
      price,
      purchaseDate,
      expiryDate,
      dateOpened,
      paoMonths,
      rating,
      notes,
      concernIds, // Array of concern IDs (opsional)
    } = body;

    const result = await db.transaction(async (tx) => {
      // 1. Insert Beauty Item Utama
      const [newItem] = await tx
        .insert(beautyItems)
        .values({
          householdId,
          categoryId,
          createdById: userId,
          brandId,
          storeId: storeId || null,
          name,
          status: status || "active",
          quantity: quantity ?? 1,
          minStock: minStock ?? 1,
          price: price ? String(price) : "0",
          purchaseDate: purchaseDate ? (new Date(purchaseDate) as any) : null,
          expiryDate: expiryDate ? (new Date(expiryDate) as any) : null,
          dateOpened: dateOpened ? (new Date(dateOpened) as any) : null,
          paoMonths: paoMonths ? Number(paoMonths) : null,
          rating: rating ? Number(rating) : null,
          notes: notes || null,
        })
        .returning();

      // 2. Insert Relasi Concerns (jika dikirimkan)
      if (concernIds && Array.isArray(concernIds) && concernIds.length > 0) {
        const concernValues = concernIds.map((concernId: string) => ({
          itemId: newItem.id,
          concernId,
        }));
        await tx.insert(beautyItemConcerns).values(concernValues);
      }

      return newItem;
    });

    return sendStandardResponse(
      result,
      "Beauty item created successfully.",
      201,
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, concernIds, ...updateData } = body;

    if (!id) {
      throw new Error("Item ID is required for update.");
    }

    const result = await db.transaction(async (tx) => {
      // 1. Update data utama item
      const [updated] = await tx
        .update(beautyItems)
        .set({
          ...updateData,
          price: updateData.price ? String(updateData.price) : undefined,
          purchaseDate: updateData.purchaseDate
            ? (new Date(updateData.purchaseDate) as any)
            : undefined,
          expiryDate: updateData.expiryDate
            ? (new Date(updateData.expiryDate) as any)
            : undefined,
          dateOpened: updateData.dateOpened
            ? (new Date(updateData.dateOpened) as any)
            : undefined,
          updatedAt: new Date(),
        })
        .where(eq(beautyItems.id, id))
        .returning();

      if (!updated) throw new Error("Beauty item not found");

      // 2. Update relasi concerns jika ada perubahan array concernIds
      if (concernIds && Array.isArray(concernIds)) {
        await tx
          .delete(beautyItemConcerns)
          .where(eq(beautyItemConcerns.itemId, id));

        if (concernIds.length > 0) {
          const concernValues = concernIds.map((concernId: string) => ({
            itemId: id,
            concernId,
          }));
          await tx.insert(beautyItemConcerns).values(concernValues);
        }
      }

      return updated;
    });

    return sendStandardResponse(result, "Beauty item updated successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return sendStandardResponse(null, "Item ID is required.", 400, "error");
    }

    // Soft delete dengan mengisi deletedAt
    const [deleted] = await db
      .update(beautyItems)
      .set({ deletedAt: new Date() })
      .where(eq(beautyItems.id, id))
      .returning();

    if (!deleted) {
      return sendStandardResponse(null, "Beauty item not found.", 404, "error");
    }

    return sendStandardResponse(deleted, "Beauty item deleted successfully.");
  } catch (error) {
    return sendStandardResponse(
      null,
      error instanceof Error ? error.message : "Internal Server Error",
      500,
      "error",
    );
  }
}
