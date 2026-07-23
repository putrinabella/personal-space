import { db } from "@/db";
import { financeAccounts, financeMonthlySummaries } from "@/db/schema";
import { sendStandardResponse } from "@/lib/apiResponse";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { and, eq, isNull, sum } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    // Ambil parameter tahun dan bulan, default ke waktu sekarang jika tidak ada
    const currentDate = new Date();
    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : currentDate.getFullYear();
    const month = searchParams.get("month")
      ? Number(searchParams.get("month"))
      : currentDate.getMonth() + 1; // Januari = 0, jadi ditambah 1

    // 1. Ambil spesifik 1 data summary berdasarkan household, year, dan month
    const summary = await db.query.financeMonthlySummaries.findFirst({
      where: and(
        eq(financeMonthlySummaries.householdId, householdId),
        eq(financeMonthlySummaries.year, year),
        eq(financeMonthlySummaries.month, month),
      ),
    });

    // 2. Hitung total saldo keseluruhan dari semua akun
    const [accountResult] = await db
      .select({
        totalBalance: sum(financeAccounts.currentBalance),
      })
      .from(financeAccounts)
      .where(
        and(
          eq(financeAccounts.householdId, householdId),
          isNull(financeAccounts.deletedAt),
        ),
      );

    const totalBalanceAllAccounts = Number(accountResult?.totalBalance ?? 0);

    // Jika data summary di bulan tersebut belum ada di database,
    // kita bisa buatkan objek default atau kembalikan null/zero value agar tetap konsisten
    const summaryData = summary
      ? {
          ...summary,
          totalBalance: String(totalBalanceAllAccounts),
        }
      : {
          id: null,
          householdId,
          month,
          year,
          totalIncome: "0.00",
          totalExpense: "0.00",
          totalSavings: "0.00",
          netBalance: "0.00",
          createdAt: null,
          updatedAt: null,
          deletedAt: null,
          totalBalance: String(totalBalanceAllAccounts),
        };

    return sendStandardResponse(
      summaryData,
      "Monthly summary retrieved successfully.",
    );
  } catch (error: any) {
    return sendStandardResponse(null, error.message, 500, "error");
  }
}

export async function GETs(request: NextRequest) {
  try {
    const { householdId } = await getHouseholdAuth();
    const { searchParams } = new URL(request.url);

    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : new Date().getFullYear();

    // 1. Ambil data monthly summaries berdasarkan household dan tahun
    const summaries = await db.query.financeMonthlySummaries.findMany({
      where: and(
        eq(financeMonthlySummaries.householdId, householdId),
        eq(financeMonthlySummaries.year, year),
      ),
      orderBy: (table, { asc }) => [asc(table.month)],
    });

    // 2. Hitung total saldo keseluruhan dari semua akun aktif milik household
    const [accountResult] = await db
      .select({
        totalBalance: sum(financeAccounts.currentBalance),
      })
      .from(financeAccounts)
      .where(
        and(
          eq(financeAccounts.householdId, householdId),
          isNull(financeAccounts.deletedAt), // Sesuaikan jika tabel accounts Anda memiliki soft delete
        ),
      );

    const totalBalanceAllAccounts = Number(accountResult?.totalBalance ?? 0);

    // 3. Gabungkan hasilnya ke dalam satu objek respons
    const responseData = {
      totalBalance: totalBalanceAllAccounts,
      summaries: summaries,
    };

    return sendStandardResponse(
      responseData,
      "Monthly summaries and total balance retrieved successfully.",
    );
  } catch (error: any) {
    return sendStandardResponse(null, error.message, 500, "error");
  }
}
