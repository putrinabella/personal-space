// app/api/finance/types/route.ts
import { NextRequest } from "next/server";
import { db } from "@/db";
import { types } from "@/db/schema/finance";
import { eq, and } from "drizzle-orm";
import { sendStandardResponse } from "@/lib/apiResponse";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return sendStandardResponse(null, "Unauthorized", 401, "error");

  const data = await db.query.types.findMany({
    where: eq(types.userId, user.id),
  });
  return sendStandardResponse(data, "Berhasil mengambil kategori.");
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return sendStandardResponse(null, "Unauthorized", 401, "error");

  const { name, type, iconSlug } = await request.json();
  const [newType] = await db
    .insert(types)
    .values({ userId: user.id, name, type, iconSlug })
    .returning();
  return sendStandardResponse(newType, "Kategori berhasil dibuat.", 201);
}
