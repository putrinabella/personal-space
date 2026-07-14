// import { financeAccountTransfers } from "@/db/schema";
// import { createFinanceHandler } from "@/lib/server/crud/withAuth";

// export async function POST(req: Request) {
//   const handler = await createFinanceHandler({
//     table: financeAccountTransfers,
//     entity: "Transfer",
//   });
//   const body = await req.json();

//   // Custom Logic: validasi saldo cukup atau pindah saldo antar pocket

//   return handler.POST(
//     new Request(req.url, { method: "POST", body: JSON.stringify(body) }),
//   );
// }

// export async function GET(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeAccountTransfers,
//       entity: "Transfer",
//     })
//   ).GET(req);
// }
// export async function PUT(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeAccountTransfers,
//       entity: "Transfer",
//     })
//   ).PUT(req);
// }
// export async function DELETE(req: Request) {
//   return await (
//     await createFinanceHandler({
//       table: financeAccountTransfers,
//       entity: "Transfer",
//     })
//   ).DELETE(req);
// }
import { financeAccountTransfers } from "@/db/schema/finance";
import { createFinanceHandler } from "@/lib/server/crud/withAuth";

const h = async () =>
  await createFinanceHandler({
    table: financeAccountTransfers,
    entity: "Transfer",
  });

export async function GET(req: Request) {
  return (await h()).GET(req);
}
export async function POST(req: Request) {
  const handler = await h();
  // Tambahkan custom logic pindah saldo di sini jika perlu
  return handler.POST(req);
}
export async function PUT(req: Request) {
  return (await h()).PUT(req);
}
export async function DELETE(req: Request) {
  return (await h()).DELETE(req);
}
