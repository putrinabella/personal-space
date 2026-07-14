import { financeCategories } from "@/db/schema/finance";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";

const getHandler = () =>
  createFinanceHandler({
    table: financeCategories,
    entity: "Categories",
    searchableColumns: [financeCategories.name],
  });

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
