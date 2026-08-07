// "use client";

// // Ganti nama atau hilangkan anggapan sebagai hook, cukup jadikan fungsi biasa
// export function calculateTransactionCalendar(transactions: any[]) {
//   const map: Record<string, any> = {};

//   if (!transactions || !Array.isArray(transactions)) return map;

//   transactions.forEach((trx: any) => {
//     const dateStr = trx.date ? trx.date.split("T")[0] : "";
//     if (!dateStr) return;

//     if (!map[dateStr]) {
//       map[dateStr] = {
//         dateStr,
//         badgeText: "",
//         badgeType: trx.type === "income" ? "income" : "expense",
//         hasIncome: false,
//         hasExpense: false,
//         summary: { incomeTotal: 0, expenseTotal: 0 },
//         items: [],
//       };
//     }

//     if (trx.type === "income") {
//       map[dateStr].hasIncome = true;
//       map[dateStr].summary.incomeTotal += Number(trx.amount || 0);
//     } else {
//       map[dateStr].hasExpense = true;
//       map[dateStr].summary.expenseTotal += Number(trx.amount || 0);
//     }

//     map[dateStr].items.push({
//       id: trx.id,
//       title: trx.description,
//       amount: trx.amount,
//       type: trx.type,
//       iconSlug: trx.category?.iconSlug || "Briefcase",
//       color: trx.category?.color || "#fde047",
//       badges: [trx.category?.name, trx.account?.name, trx.pocket?.name].filter(
//         Boolean,
//       ),
//     });
//   });

//   Object.keys(map).forEach((key) => {
//     const day = map[key];
//     const totalExp = day.summary.expenseTotal;
//     const totalInc = day.summary.incomeTotal;

//     if (totalInc > 0 && totalExp === 0) {
//       day.badgeText = `${(totalInc / 1000).toFixed(0)}K`;
//       day.badgeType = "income";
//     } else if (totalExp > 0 && totalInc === 0) {
//       day.badgeText = `${(totalExp / 1000).toFixed(0)}K`;
//       day.badgeType = "expense";
//     } else {
//       day.badgeText = `${((totalInc - totalExp) / 1000).toFixed(0)}K`;
//       day.badgeType = "neutral";
//     }
//   });

//   return map;
// }
"use client";
"use client";

export function calculateTransactionCalendar(transactions: any[]) {
  const map: Record<string, any> = {};

  if (!transactions || !Array.isArray(transactions)) return map;

  transactions.forEach((trx: any) => {
    const dateStr = trx.date ? trx.date.split("T")[0] : "";
    if (!dateStr) return;

    if (!map[dateStr]) {
      map[dateStr] = {
        dateStr,
        badgeText: "",
        badgeType: trx.type === "income" ? "income" : "expense",
        hasIncome: false,
        hasExpense: false,
        summary: { incomeTotal: 0, expenseTotal: 0 },
        items: [],
      };
    }

    if (trx.type === "income") {
      map[dateStr].hasIncome = true;
      map[dateStr].summary.incomeTotal += Number(trx.amount || 0);
    } else {
      map[dateStr].hasExpense = true;
      map[dateStr].summary.expenseTotal += Number(trx.amount || 0);
    }

    // Masukkan transaksi apa adanya, biarkan category, account, dan pocket tetap terpisah secara utuh
    map[dateStr].items.push({
      ...trx,
      title: trx.description || trx.title,
    });
  });

  Object.keys(map).forEach((key) => {
    const day = map[key];
    const totalExp = day.summary.expenseTotal;
    const totalInc = day.summary.incomeTotal;

    if (totalInc > 0 && totalExp === 0) {
      day.badgeText = `${(totalInc / 1000).toFixed(0)}K`;
      day.badgeType = "income";
    } else if (totalExp > 0 && totalInc === 0) {
      day.badgeText = `${(totalExp / 1000).toFixed(0)}K`;
      day.badgeType = "expense";
    } else {
      day.badgeText = `${((totalInc - totalExp) / 1000).toFixed(0)}K`;
      day.badgeType = "neutral";
    }
  });

  return map;
}
