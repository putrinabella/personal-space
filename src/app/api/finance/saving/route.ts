import { db } from "@/db";
import { financePockets, financeSavingGoals } from "@/db/schema/finance";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { NextRequest } from "next/server";
import { and, eq, ilike, or } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";
// const getHandler = () =>
//   createFinanceHandler({
//     table: financeSavingGoals,
//     entity: "Savings",
//     searchableColumns: [financeSavingGoals.name],
//   });
export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const filters = [];

    // Filter keamanan wajib berdasarkan household melalui tabel pockets
    filters.push(eq(financePockets.householdId, householdId));

    // Filter berdasarkan pocketId
    if (searchParams.get("pocketId")) {
      filters.push(
        eq(financeSavingGoals.pocketId, searchParams.get("pocketId")!),
      );
    }

    // Filter berdasarkan status isCompleted (true / false)
    if (searchParams.has("isCompleted")) {
      filters.push(
        eq(
          financeSavingGoals.isCompleted,
          searchParams.get("isCompleted") === "true",
        ),
      );
    }

    // Filter search berdasarkan name atau description
    if (searchParams.get("search")) {
      const searchTerm = `%${searchParams.get("search")}%`;
      filters.push(
        or(
          ilike(financeSavingGoals.name, searchTerm),
          ilike(financeSavingGoals.description, searchTerm),
        )!,
      );
    }

    // Query utama untuk mengambil data saving goals
    const goals = await db
      .select({
        id: financeSavingGoals.id,
        name: financeSavingGoals.name,
        description: financeSavingGoals.description,
        targetAmount: financeSavingGoals.targetAmount,
        targetDate: financeSavingGoals.targetDate,
        isCompleted: financeSavingGoals.isCompleted,
        pocketId: financeSavingGoals.pocketId,
        createdAt: financeSavingGoals.createdAt,
        updatedAt: financeSavingGoals.updatedAt,
        pocket: financePockets,
      })
      .from(financeSavingGoals)
      .innerJoin(
        financePockets,
        eq(financeSavingGoals.pocketId, financePockets.id),
      )
      .where(and(...filters));

    return sendStandardResponse(goals, "Saving goals retrieved successfully.");
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}
// export async function GET() {
//   try {
//     const { householdId } = await getHouseholdAuth();

//     // Ambil data saving goals dengan join ke financePockets untuk keamanan filter householdId
//     const goals = await db
//       .select({
//         id: financeSavingGoals.id,
//         name: financeSavingGoals.name,
//         description: financeSavingGoals.description,
//         targetAmount: financeSavingGoals.targetAmount,
//         targetDate: financeSavingGoals.targetDate,
//         isCompleted: financeSavingGoals.isCompleted,
//         pocketId: financeSavingGoals.pocketId,
//         pocketName: financePockets.name,
//         createdAt: financeSavingGoals.createdAt,
//         updatedAt: financeSavingGoals.updatedAt,
//       })
//       .from(financeSavingGoals)
//       .innerJoin(
//         financePockets,
//         eq(financeSavingGoals.pocketId, financePockets.id),
//       )
//       .where(eq(financePockets.householdId, householdId));

//     return sendStandardResponse(goals, "Saving goals retrieved successfully.");
//   } catch (error: any) {
//     return sendStandardResponse(
//       null,
//       error.message || "Internal Server Error",
//       500,
//       "error",
//     );
//   }
// }

// POST: Membuat saving goal baru
export async function POST(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const body = await request.json();
    const { name, description, pocketId, targetAmount, targetDate } = body;

    // Validasi apakah pocketId yang dipilih benar-benar milik household yang sedang login
    const pocket = await db.query.financePockets.findFirst({
      where: and(
        eq(financePockets.id, pocketId),
        eq(financePockets.householdId, householdId),
      ),
    });

    if (!pocket) {
      return sendStandardResponse(
        null,
        "Invalid pocket or unauthorized.",
        400,
        "error",
      );
    }

    const [newGoal] = await db
      .insert(financeSavingGoals)
      .values({
        name,
        description,
        pocketId,
        targetAmount,
        targetDate,
      })
      .returning();

    return sendStandardResponse(
      newGoal,
      "Saving goal created successfully.",
      201,
    );
  } catch (error: any) {
    return sendStandardResponse(
      null,
      error.message || "Internal Server Error",
      500,
      "error",
    );
  }
}
// export async function GET(request: Request) {
//   return (await getHandler()).GET(request);
// }
// export async function POST(request: Request) {
//   return (await getHandler()).POST(request);
// }
// export async function PUT(request: Request) {
//   return (await getHandler()).PUT(request);
// }
// export async function DELETE(request: Request) {
//   return (await getHandler()).DELETE(request);
// }
