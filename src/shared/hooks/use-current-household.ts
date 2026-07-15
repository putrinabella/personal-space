"use server";
import { householdMembers } from "@/db/schema/finance";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";

// Ubah nama dari 'useHousehold' menjadi 'getHousehold'
// export async function getHousehold() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return null;

//   const result = await db
//     .select({ householdId: householdMembers.householdId })
//     .from(householdMembers)
//     .where(eq(householdMembers.userId, user.id))
//     .limit(1);

//   return result.length > 0 ? result[0].householdId : null;
// }
// @/shared/hooks/get-household.ts
export async function getHousehold() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const result = await db
    .select({ householdId: householdMembers.householdId })
    .from(householdMembers)
    .where(eq(householdMembers.userId, user.id))
    .limit(1);

  console.log("SERVER DEBUG - Found Household:", result[0]?.householdId);
  return result.length > 0 ? result[0].householdId : null;
}
