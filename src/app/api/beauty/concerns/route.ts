import { beautyConcerns } from "@/db/schema/beauty";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createCrudHandler } from "@/lib/server/crud/createCrudHandler";
import { eq } from "drizzle-orm";

async function getHandler() {
  const { householdId } = await getHouseholdAuth();
  return createCrudHandler({
    table: beautyConcerns,
    entity: "Concerns",

    searchableColumns: [beautyConcerns.name],
    filterableColumns: ["type"],
    defaultWhere: eq(beautyConcerns.householdId, householdId),
  });
}
export async function GET(req: Request) {
  return (await getHandler()).GET(req);
}
export async function POST(req: Request) {
  return (await getHandler()).POST(req);
}
export async function PUT(req: Request) {
  return (await getHandler()).PUT(req);
}
export async function DELETE(req: Request) {
  return (await getHandler()).DELETE(req);
}
