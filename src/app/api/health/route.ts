// src/app/api/health/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // Test authentication check query
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json(
      { status: "Error", message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    status: "Healthy Connection established!",
    authenticated: !!session,
  });
}
