import { getHouseholdAuth } from "@/lib/financeAuth";
import { eq } from "drizzle-orm";
import { createCrudHandler } from "./createCrudHandler";

export async function createFinanceHandler(options: any) {
  const { householdId } = await getHouseholdAuth();
  // const { householdId, userId } = await getHouseholdAuth();
  return createCrudHandler({
    ...options,
    defaultWhere: eq(options.table.householdId, householdId),
  });
}
