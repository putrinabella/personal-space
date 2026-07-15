import { financeTransactions } from "@/db/schema";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";

const h = async () =>
  await createFinanceHandler({
    table: financeTransactions,
    entity: "Transaction",
  });

export async function GET(req: Request) {
  return (await h()).GET(req);
}
export async function POST(req: Request) {
  const handler = await h();
  return handler.POST(req);
}
export async function PUT(req: Request) {
  return (await h()).PUT(req);
}
export async function DELETE(req: Request) {
  return (await h()).DELETE(req);
}
