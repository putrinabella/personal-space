import { db } from "@/db";
import { householdMembers } from "@/db/schema/finance";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";

export async function getHouseholdAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const member = await db.query.householdMembers.findFirst({
    where: eq(householdMembers.userId, user.id),
  });

  if (!member) {
    throw new Error("HouseholdNotFound");
  }

  return {
    userId: user.id,
    householdId: member.householdId,
  };
}
