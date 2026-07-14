import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq } from "drizzle-orm";
import { createCrudHandler } from "./createCrudHandler";

export async function createFinanceHandler(options: any) {
  const { householdId, userId } = await getHouseholdAuth();

  // Menambahkan defaultWhere otomatis untuk setiap entitas
  return createCrudHandler({
    ...options,
    defaultWhere: eq(options.table.householdId, householdId),
  });
}
