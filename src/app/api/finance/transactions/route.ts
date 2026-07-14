// import { db } from "@/db";
// import { financeTransactions } from "@/db/schema";
// import { createFinanceHandler } from "@/lib/server/crud/withAuth";
// import { eq } from "drizzle-orm";

import { financeTransactions } from "@/db/schema";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";

// export async function POST(req: Request) {
//   const handler = await createFinanceHandler({
//     table: financeTransactions,
//     entity: "Transaction",
//   });
//   const body = await req.json();

//   // Custom Logic: Update balance pocket
//   await db.transaction(async (tx) => {
//     // 1. Insert Transaksi
//     await tx.insert(financeTransactions).values(body);
//     // 2. Update saldo (contoh logika)
//     // await tx.update(pockets).set({ balance: ... }).where(eq(pockets.id, body.pocketId));
//   });

//   return handler.POST(
//     new Request(req.url, { method: "POST", body: JSON.stringify(body) }),
//   );
// }

// export async function GET(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeTransactions,
//       entity: "Transaction",
//     })
//   ).GET(req);
// }
// export async function PUT(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeTransactions,
//       entity: "Transaction",
//     })
//   ).PUT(req);
// }
// export async function DELETE(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeTransactions,
//       entity: "Transaction",
//     })
//   ).DELETE(req);
// }

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
  // Tambahkan custom logic saldo di sini jika perlu
  return handler.POST(req);
}
export async function PUT(req: Request) {
  return (await h()).PUT(req);
}
export async function DELETE(req: Request) {
  return (await h()).DELETE(req);
}
