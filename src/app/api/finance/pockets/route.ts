import { financePockets } from "@/db/schema/finance";
import { createCrudHandler } from "@/lib/server/crud/createCrudHandler";
import { getHouseholdAuth } from "@/lib/financeAuth"; // Import helper auth Anda
import { eq } from "drizzle-orm";
async function getHandler() {
  const { householdId } = await getHouseholdAuth();
  return createCrudHandler({
    table: financePockets,
    entity: "Pocket",
    searchableColumns: [financePockets.name],
    defaultWhere: eq(financePockets.householdId, householdId), // Filter keamanan
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
