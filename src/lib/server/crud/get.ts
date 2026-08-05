import { db } from "@/db";
import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
import { SQL, and, count, eq, ilike, isNull, or } from "drizzle-orm";
import { AnyColumn } from "drizzle-orm";
import { CrudHandlerOptions } from "./types";
export function createGetHandler(options: CrudHandlerOptions) {
  return async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);

      const id = searchParams.get("id");
      const page = Number(searchParams.get("page"));
      const perPage = Number(searchParams.get("per_page") ?? 15);
      const search = searchParams.get("search");

      const table = options.table as unknown as {
        id: AnyColumn;
        deletedAt?: AnyColumn;
        [key: string]: any; // Agar bisa akses kolom dinamis untuk filter
      };

      const filters: SQL[] = [];

      // 1. Masukkan default where (misal: householdId)
      if (options.defaultWhere) {
        filters.push(options.defaultWhere);
      }

      // 2. Soft delete check
      if (options.enableSoftDelete !== false && table.deletedAt) {
        filters.push(isNull(table.deletedAt));
      }

      // 3. Ambil data berdasarkan ID spesifik
      if (id) {
        filters.push(eq(table.id, id));
        const [item] = await db
          .select()
          .from(options.table)
          .where(and(...filters))
          .limit(1);

        if (!item) {
          return sendStandardResponse(
            null,
            `${options.entity} not found.`,
            404,
            "error",
          );
        }
        return sendStandardResponse(
          item,
          `${options.entity} retrieved successfully.`,
        );
      }

      // 4. MULTI-COLUMN SEARCH (Pencarian lebih dari 1 kolom)
      // Contoh: searchableColumns: [financePockets.name, financePockets.description]
      if (
        search &&
        options.searchableColumns &&
        options.searchableColumns.length
      ) {
        filters.push(
          or(
            ...options.searchableColumns.map((column) =>
              ilike(column, `%${search}%`),
            ),
          )!,
        );
      }

      // 5. CUSTOM FILTER (Filter spesifik kolom, misal: ?type=saving)
      if (options.filterableColumns) {
        options.filterableColumns.forEach((colName) => {
          const filterValue = searchParams.get(colName);
          if (filterValue !== null && filterValue !== "" && table[colName]) {
            filters.push(eq(table[colName], filterValue));
          }
        });
      }

      // Eksekusi Query (Dengan atau Tanpa Pagination)
      if (!page) {
        const items = await db
          .select()
          .from(options.table)
          .where(filters.length ? and(...filters) : undefined);

        return sendStandardResponse(
          items,
          `${options.entity} list retrieved successfully.`,
        );
      }

      const offset = (page - 1) * perPage;
      const [items, total] = await Promise.all([
        db
          .select()
          .from(options.table)
          .where(filters.length ? and(...filters) : undefined)
          .limit(perPage)
          .offset(offset),
        db
          .select({ count: count() })
          .from(options.table)
          .where(filters.length ? and(...filters) : undefined),
      ]);

      return sendPaginatedResponse({
        requestUrl: request.url,
        items,
        totalItems: total[0]?.count ?? 0,
        page,
        perPage,
        message: `${options.entity} list retrieved successfully.`,
      });
    } catch (error) {
      return sendStandardResponse(
        null,
        error instanceof Error ? error.message : "Internal Server Error",
        500,
        "error",
      );
    }
  };
}
// export function createGetHandler(options: CrudHandlerOptions) {
//   return async function GET(request: Request) {
//     try {
//       const { searchParams } = new URL(request.url);

//       const id = searchParams.get("id");

//       const page = Number(searchParams.get("page"));
//       const perPage = Number(searchParams.get("per_page") ?? 15);

//       const search = searchParams.get("search");

//       const table = options.table as unknown as {
//         id: AnyColumn;
//         deletedAt?: AnyColumn;
//       };

//       const filters: SQL[] = [];

//       if (options.defaultWhere) {
//         filters.push(options.defaultWhere);
//       }
//       if (options.enableSoftDelete !== false && table.deletedAt) {
//         filters.push(isNull(table.deletedAt));
//       }
//       if (id) {
//         filters.push(eq(table.id, id));

//         const [item] = await db
//           .select()
//           .from(options.table)
//           .where(and(...filters))
//           .limit(1);

//         if (!item) {
//           return sendStandardResponse(
//             null,
//             `${options.entity} not found.`,
//             404,
//             "error",
//           );
//         }

//         return sendStandardResponse(
//           item,
//           `${options.entity} retrieved successfully.`,
//         );
//       }
//       if (
//         search &&
//         options.searchableColumns &&
//         options.searchableColumns.length
//       ) {
//         filters.push(
//           or(
//             ...options.searchableColumns.map((column) =>
//               ilike(column, `%${search}%`),
//             ),
//           )!,
//         );
//       }
//       if (!page) {
//         const items = await db
//           .select()
//           .from(options.table)
//           .where(filters.length ? and(...filters) : undefined);

//         return sendStandardResponse(
//           items,
//           `${options.entity} list retrieved successfully.`,
//         );
//       }
//       const offset = (page - 1) * perPage;

//       const [items, total] = await Promise.all([
//         db
//           .select()
//           .from(options.table)
//           .where(filters.length ? and(...filters) : undefined)
//           .limit(perPage)
//           .offset(offset),

//         db
//           .select({
//             count: count(),
//           })
//           .from(options.table)
//           .where(filters.length ? and(...filters) : undefined),
//       ]);

//       return sendPaginatedResponse({
//         requestUrl: request.url,
//         items,
//         totalItems: total[0]?.count ?? 0,
//         page,
//         perPage,
//         message: `${options.entity} list retrieved successfully.`,
//       });
//     } catch (error) {
//       return sendStandardResponse(
//         null,
//         error instanceof Error ? error.message : "Internal Server Error",
//         500,
//         "error",
//       );
//     }
//   };
// }
