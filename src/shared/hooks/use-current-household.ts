"use server";
import { householdMembers } from "@/db/schema/finance";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";

async function getAuthData() {
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

  return { user, householdId: result[0]?.householdId };
}

export async function getHousehold() {
  const data = await getAuthData();
  return data?.householdId || null;
}

export async function getFinanceAuth() {
  const data = await getAuthData();
  if (!data?.user || !data?.householdId)
    throw new Error("Unauthorized/Household not found");
  return { userId: data.user.id, householdId: data.householdId };
}
