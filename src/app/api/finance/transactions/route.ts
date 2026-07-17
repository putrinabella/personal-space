import { db } from "@/db";
import { financeAccounts, financeTransactions } from "@/db/schema";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

const h = async () =>
  await createFinanceHandler({
    table: financeTransactions,
    entity: "Transaction",
  });

export async function GET(req: Request) {
  return (await h()).GET(req);
}

export async function POST(request: NextRequest) {
  try {
    const { householdId, userId } = await getHouseholdAuth();
    const body = await request.json();
    const {
      accountId,
      categoryId,
      amount,
      type,
      description,
      pocketId,
      date,
      status,
    } = body;

    const result = await db.transaction(async (tx) => {
      const [newTransaction] = await tx
        .insert(financeTransactions)
        .values({
          householdId,
          accountId,
          pocketId: pocketId || null,
          categoryId,
          amount: String(amount),
          type,
          status: status || "completed", // Default ke completed
          description,
          date: date ? new Date(date) : new Date(),
          createdById: userId,
        })
        .returning();

      // Saldo dikurangi/ditambah jika transaksi bukan 'cancelled'
      if (status !== "cancelled") {
        const adjustment = type === "income" ? amount : -amount;
        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${adjustment}`,
          })
          .where(eq(financeAccounts.id, accountId));
      }

      return newTransaction;
    });

    return sendStandardResponse(result, "Transaction saved successfully.", 201);
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, amount, type, accountId } = body; // Anda perlu kirim data ini dari frontend

    const result = await db.transaction(async (tx) => {
      // 1. Ambil transaksi lama untuk cek status sebelumnya
      const oldTransaction = await tx.query.financeTransactions.findFirst({
        where: eq(financeTransactions.id, id),
      });

      if (!oldTransaction) throw new Error("Transaction not found");

      // 2. Update status transaksi
      const [updated] = await tx
        .update(financeTransactions)
        .set({ status })
        .where(eq(financeTransactions.id, id))
        .returning();

      // 3. Logika Koreksi Saldo
      // Jika sebelumnya bukan cancelled, dan sekarang jadi cancelled => kembalikan saldo
      if (oldTransaction.status !== "cancelled" && status === "cancelled") {
        const reverseAdjustment =
          oldTransaction.type === "income"
            ? -Number(oldTransaction.amount)
            : Number(oldTransaction.amount);
        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${reverseAdjustment}`,
          })
          .where(eq(financeAccounts.id, oldTransaction.accountId));
      }

      // Jika sebelumnya cancelled, dan sekarang jadi completed/pending => potong saldo
      else if (
        oldTransaction.status === "cancelled" &&
        status !== "cancelled"
      ) {
        const adjustment =
          oldTransaction.type === "income"
            ? Number(oldTransaction.amount)
            : -Number(oldTransaction.amount);
        await tx
          .update(financeAccounts)
          .set({
            currentBalance: sql`${financeAccounts.currentBalance} + ${adjustment}`,
          })
          .where(eq(financeAccounts.id, oldTransaction.accountId));
      }

      return updated;
    });

    return sendStandardResponse(result, "Transaction updated successfully.");
  } catch (err: any) {
    return sendStandardResponse(null, err.message, 500, "error");
  }
}

export async function DELETE(req: Request) {
  return (await h()).DELETE(req);
}

// export async function POST(request: NextRequest) {
//   try {
//     // Ambil keduanya sekaligus
//     const { householdId, userId } = await getHouseholdAuth();

//     const body = await request.json();
//     const { accountId, categoryId, amount, type, description, pocketId, date } =
//       body;

//     const result = await db.transaction(async (tx) => {
//       // 1. Simpan Transaksi dengan userId yang didapat dari auth
//       const [newTransaction] = await tx
//         .insert(financeTransactions)
//         .values({
//           householdId,
//           accountId,
//           pocketId: pocketId || null,
//           categoryId,
//           amount: String(amount),
//           type,
//           description,
//           date: date ? new Date(date) : new Date(),
//           createdById: userId, // Gunakan userId dari Supabase
//         })
//         .returning();

//       // 2. Update Saldo Akun
//       const adjustment = type === "income" ? amount : -amount;
//       await tx
//         .update(financeAccounts)
//         .set({
//           currentBalance: sql`${financeAccounts.currentBalance} + ${adjustment}`,
//         })
//         .where(eq(financeAccounts.id, accountId));

//       return newTransaction;
//     });

//     return sendStandardResponse(result, "Transaction saved successfully.", 201);
//   } catch (err: any) {
//     return sendStandardResponse(null, err.message, 500, "error");
//   }
// }
// export async function PUT(req: Request) {
//   return (await h()).PUT(req);
// }
