import { beautyWasteHistory } from "@/db/schema/beauty";
import { getHouseholdAuth } from "@/lib/financeAuth";
import { createCrudHandler } from "@/lib/server/crud/createCrudHandler";
import { eq } from "drizzle-orm";

async function getHandler() {
  const { householdId } = await getHouseholdAuth();
  return createCrudHandler({
    table: beautyWasteHistory,
    entity: "WasteHistory",
    // searchableColumns: [beautyWasteHistory.name, beautyWasteHistory.description],
    // filterableColumns: ["type", "status"],
    searchableColumns: [beautyWasteHistory.name],
    filterableColumns: ["type"],
    defaultWhere: eq(beautyWasteHistory.householdId, householdId),
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
