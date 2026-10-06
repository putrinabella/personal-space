import { db } from "@/db";
import {
  beautyItems,
  beautyItemUnits,
  beautyCategories,
  beautyBrands,
  beautyItemConcerns,
  beautyConcerns,
} from "@/db/schema/beauty";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq, ilike, isNull, asc, and, count, inArray, sql } from "drizzle-orm";
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

    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");
    const status = searchParams.get("status");
    const concernId = searchParams.get("concernId");
    const expiryWindow = searchParams.get("expiryWindow");

    const filters = [
      eq(beautyItems.householdId, householdId),
      isNull(beautyItems.deletedAt),
    ];

    if (id) filters.push(eq(beautyItems.id, id));
    if (search) filters.push(ilike(beautyItems.name, `%${search}%`));
    if (categoryId) filters.push(eq(beautyItems.categoryId, categoryId));
    if (brandId) filters.push(eq(beautyItems.brandId, brandId));

    if (concernId) {
      filters.push(
        sql`${beautyItems.id} IN (SELECT item_id FROM ${beautyItemConcerns} WHERE concern_id = ${concernId})`,
      );
    }

    if (status) {
      filters.push(eq(beautyItemUnits.status, status as any));
    }

    if (expiryWindow === "expiring_this_month") {
      const now = new Date();
      const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      const end = `${now.getFullYear()}-${String(now.getMonth() + 2).padStart(2, "0")}-01`;
      filters.push(
        sql`${beautyItemUnits.expiryDate} >= ${start} AND ${beautyItemUnits.expiryDate} < ${end}`,
      );
    }

    const buildQuery = (isPaginated: boolean = false) => {
      let query = db
        .select({
          item: beautyItems,
          category: beautyCategories,
          brand: beautyBrands,
        })
        .from(beautyItems)
        .leftJoin(
          beautyCategories,
          eq(beautyCategories.id, beautyItems.categoryId),
        )
        .leftJoin(beautyBrands, eq(beautyBrands.id, beautyItems.brandId))
        .leftJoin(beautyItemUnits, eq(beautyItemUnits.itemId, beautyItems.id))
        .where(and(...filters))
        .groupBy(beautyItems.id, beautyCategories.id, beautyBrands.id)
        .orderBy(asc(sql`min(${beautyItemUnits.expiryDate})`)) as any;

      if (isPaginated && page) {
        query = query.limit(perPage).offset((page - 1) * perPage);
      }
      return query;
    };

    const rawItems = await buildQuery(Boolean(page));
    const itemIds = rawItems.map((r: any) => r.item.id);

    let allUnitsMap: Record<string, any[]> = {};
    let allConcernsMap: Record<string, any[]> = {};

    if (itemIds.length > 0) {
      const allUnits = await db
        .select()
        .from(beautyItemUnits)
        .where(inArray(beautyItemUnits.itemId, itemIds));
      const currentTime = Date.now();
      const today = new Date();

      allUnitsMap = allUnits.reduce((acc: any, curr) => {
        if (!acc[curr.itemId]) acc[curr.itemId] = [];

        // 1. Kalkulasi PAO Progress
        let paoProgress: number | null = null;
        if (curr.dateOpened && curr.paoMonths) {
          const openedDate = new Date(curr.dateOpened);
          const paoEndDate = new Date(openedDate);
          paoEndDate.setMonth(paoEndDate.getMonth() + curr.paoMonths);

          const start = openedDate.getTime();
          const end = paoEndDate.getTime();

          if (end > start) {
            paoProgress = Math.min(
              Math.max(((currentTime - start) / (end - start)) * 100, 0),
              100,
            );
          }
        }

        // 2. Kalkulasi Expiry Alert & Days Left
        let isExpired = false;
        let isExpiringSoon = false;
        let daysLeft: number | null = null;

        if (curr.expiryDate) {
          const expiryDate = new Date(curr.expiryDate);
          const diffTime = expiryDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          daysLeft = diffDays;
          isExpired = diffDays < 0;
          isExpiringSoon = diffDays >= 0 && diffDays <= 30;
        }

        acc[curr.itemId].push({
          ...curr,
          paoProgress: paoProgress !== null ? Math.round(paoProgress) : null,
          isExpired,
          isExpiringSoon,
          daysLeft, // <-- Properti daysLeft ditambahkan di sini
        });

        return acc;
      }, {});

      // 3. Urutkan unit di setiap item berdasarkan expiryDate terdekat (Ascending)
      Object.keys(allUnitsMap).forEach((itemId) => {
        allUnitsMap[itemId].sort((a: any, b: any) => {
          if (!a.expiryDate) return 1; // Jika kosong, taruh di belakang
          if (!b.expiryDate) return -1;
          return (
            new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          );
        });
      });

      const allItemConcerns = await db
        .select({ itemId: beautyItemConcerns.itemId, concern: beautyConcerns })
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

    const formattedItems = rawItems.map((row: any) => {
      const itemConcerns = allConcernsMap[row.item.id] || [];
      return {
        ...row.item,
        category: row.category,
        brand: row.brand,
        store: row.store,
        units: allUnitsMap[row.item.id] || [],
        quantity: (allUnitsMap[row.item.id] || []).length,
        concerns: itemConcerns,
        concernIds: itemConcerns.map((c: any) => c.id),
      };
    });

    if (id) {
      if (formattedItems.length === 0) {
        return sendStandardResponse(
          null,
          "Beauty item not found",
          404,
          "error",
        );
      }
      return sendStandardResponse(formattedItems[0], "Success");
    }

    if (!page) return sendStandardResponse(formattedItems, "Success");

    const [total] = await db
      .select({ count: count() })
      .from(beautyItems)
      .where(and(...filters));

    return sendPaginatedResponse({
      requestUrl: request.url,
      items: formattedItems,
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

    const isNewProduct = !!body.isNewProduct;
    const formData = body;

    const result = await db.transaction(async (tx) => {
      let activeBeautyItemId = formData.beautyItemId;

      if (isNewProduct) {
        const [newItem] = await tx
          .insert(beautyItems)
          .values({
            householdId,
            categoryId: formData.categoryId,
            createdById: userId,
            brandId: formData.brandId,
            name: formData.name,
barcode: formData.barcode || null,
            minStock: formData.minStock ?? 1,
            rating: formData.rating ? Number(formData.rating) : null,
            notes: formData.notes || null,
          })
          .returning();

        activeBeautyItemId = newItem.id;

        if (
          formData.concernIds &&
          Array.isArray(formData.concernIds) &&
          formData.concernIds.length > 0
        ) {
          const concernValues = formData.concernIds.map(
            (concernId: string) => ({
              itemId: newItem.id,
              concernId,
            }),
          );
          await tx.insert(beautyItemConcerns).values(concernValues);
        }
      }

      if (!activeBeautyItemId) {
        throw new Error(
          "Beauty Item ID tidak ditemukan. Produk gagal dipilih atau dibuat.",
        );
      }

      const [newUnit] = await tx
        .insert(beautyItemUnits)
        .values({
          itemId: activeBeautyItemId,
          status: formData.status || "active",
          price: formData.price ? String(formData.price) : "0",
          purchaseDate: formData.purchaseDate
            ? new Date(formData.purchaseDate)
            : null,
          expiryDate: formData.expiryDate
            ? new Date(formData.expiryDate)
            : null,
          dateOpened: formData.dateOpened
            ? new Date(formData.dateOpened)
            : null,
          paoMonths: formData.paoMonths ? Number(formData.paoMonths) : null,
        })
        .returning();

      return newUnit;
    });

    return sendStandardResponse(
      result,
      isNewProduct
        ? "Beauty item & unit created successfully."
        : "New unit added to existing product successfully.",
      201,
    );
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      concernIds,
      name,
      categoryId,
      brandId,
barcode,
      minStock,
      rating,
      notes,
    } = body;

    if (!id) {
      throw new Error("Item ID is required for update.");
    }

    const result = await db.transaction(async (tx) => {
      // Update tabel master beauty_items saja
      const [updated] = await tx
        .update(beautyItems)
        .set({
          name,
          categoryId,
          brandId,
barcode: barcode || null,
          minStock: minStock ?? 1,
          rating: rating ? Number(rating) : null,
          notes: notes || null,
          updatedAt: new Date(),
        })
        .where(eq(beautyItems.id, id))
        .returning();

      if (!updated) throw new Error("Beauty item not found");

      // Perbarui relation concerns jika dikirim
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

    return sendStandardResponse(
      result,
      "Beauty item master updated successfully.",
    );
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

    // Gunakan transaction agar penghapusan master dan child konsisten
    const result = await db.transaction(async (tx) => {
      // 1. Soft delete master produk
      const [deletedMaster] = await tx
        .update(beautyItems)
        .set({ deletedAt: new Date() })
        .where(eq(beautyItems.id, id))
        .returning();

      if (!deletedMaster) {
        return null;
      }

      // 2. Soft delete semua unit anak yang berelasi (menggunakan 'itemId' sesuai skema)
      await tx
        .update(beautyItemUnits)
        .set({ deletedAt: new Date() })
        .where(eq(beautyItemUnits.itemId, id));

      return deletedMaster;
    });

    if (!result) {
      return sendStandardResponse(null, "Beauty item not found.", 404, "error");
    }

    return sendStandardResponse(
      result,
      "Beauty item and its units deleted successfully.",
    );
  } catch (error) {
    return sendStandardResponse(
      null,
      error instanceof Error ? error.message : "Internal Server Error",
      500,
      "error",
    );
  }
}
