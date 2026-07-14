// import { NextRequest } from "next/server";
// import { db } from "@/db";
// import { pockets } from "@/db/schema/finance";
// import { eq, sql, desc, and } from "drizzle-orm";
// import { sendPaginatedResponse, sendStandardResponse } from "@/lib/apiResponse";
// import { validate as validateUuid } from "uuid";
// import { getHouseholdAuth } from "@/lib/financeAuth";

// export async function GET(request: NextRequest) {
//   try {
//     const { householdId } = await getHouseholdAuth();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     // 1. GET DETAIL BY ID
//     if (id) {
//       if (!validateUuid(id)) {
//         return sendStandardResponse(
//           null,
//           "Format ID Pocket tidak valid.",
//           400,
//           "error",
//         );
//       }
//       const item = await db.query.pockets.findFirst({
//         where: and(eq(pockets.id, id), eq(pockets.householdId, householdId)),
//         with: { transactions: true },
//       });
//       return item
//         ? sendStandardResponse(item, "Detail pocket ditemukan.")
//         : sendStandardResponse(null, "Pocket tidak ditemukan.", 404, "error");
//     }

//     // 2. GET ALL (Tanpa pagination)
//     if (!searchParams.has("page")) {
//       const data = await db.query.pockets.findMany({
//         where: eq(pockets.householdId, householdId),
//         orderBy: [desc(pockets.createdAt)],
//       });
//       return sendStandardResponse(data, "Berhasil mengambil daftar pocket.");
//     }

//     // 3. GET PAGINATED
//     const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
//     const perPage = Math.max(1, parseInt(searchParams.get("per_page") || "15"));
//     const offset = (page - 1) * perPage;

//     const [totalQuery, items] = await Promise.all([
//       db
//         .select({ count: sql<number>`cast(count(*) as integer)` })
//         .from(pockets)
//         .where(eq(pockets.householdId, householdId)),
//       db.query.pockets.findMany({
//         where: eq(pockets.householdId, householdId),
//         limit: perPage,
//         offset: offset,
//         orderBy: [desc(pockets.createdAt)],
//       }),
//     ]);

//     return sendPaginatedResponse({
//       requestUrl: request.url,
//       items: items,
//       totalItems: totalQuery[0]?.count || 0,
//       page,
//       perPage,
//       message: "Berhasil mengambil daftar pocket ber-pagination.",
//     });
//   } catch (err: any) {
//     return sendStandardResponse(null, err.message, 500, "error");
//   }
// }

// // POST: Menambah pocket baru
// export async function POST(request: NextRequest) {
//   try {
//     const { householdId } = await getHouseholdAuth();
//     if (!householdId)
//       return sendStandardResponse(
//         null,
//         "Household tidak ditemukan.",
//         403,
//         "error",
//       );

//     const {
//       name,
//       type,
//       balance,
//       isAutoAllocationActive,
//       monthlyAllocationAmount,
//       allocationDay,
//     } = await request.json();

//     const [newPocket] = await db
//       .insert(pockets)
//       .values({
//         householdId,
//         name,
//         type,
//         balance: balance || "0",
//         isAutoAllocationActive: !!isAutoAllocationActive,
//         monthlyAllocationAmount,
//         allocationDay,
//       })
//       .returning();

//     return sendStandardResponse(newPocket, "Pocket baru berhasil dibuat.", 201);
//   } catch (err: any) {
//     return sendStandardResponse(null, err.message, 500, "error");
//   }
// }

// // PUT: Update pocket (misal: update balance atau auto-allocation)
// export async function PUT(request: NextRequest) {
//   try {
//     const { householdId } = await getHouseholdAuth();
//     const {
//       id,
//       name,
//       balance,
//       isAutoAllocationActive,
//       monthlyAllocationAmount,
//       allocationDay,
//     } = await request.json();

//     if (!id) return sendStandardResponse(null, "ID diperlukan.", 400, "error");

//     const [updated] = await db
//       .update(pockets)
//       .set({
//         name,
//         balance,
//         isAutoAllocationActive,
//         monthlyAllocationAmount,
//         allocationDay,
//       })
//       .where(and(eq(pockets.id, id), eq(pockets.householdId, householdId!)))
//       .returning();

//     return updated
//       ? sendStandardResponse(updated, "Pocket berhasil diperbarui.")
//       : sendStandardResponse(
//           null,
//           "Pocket tidak ditemukan atau akses ditolak.",
//           404,
//           "error",
//         );
//   } catch (err: any) {
//     return sendStandardResponse(null, err.message, 500, "error");
//   }
// }
