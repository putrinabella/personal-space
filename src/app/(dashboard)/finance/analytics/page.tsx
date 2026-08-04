// "use client";

// import { useBudgetAll } from "@/features/finance/budgets/hooks/useBudgetsAll";
// import { useSavingAll } from "@/features/finance/saving/hooks/useSavingAll";
// import BudgetCard from "@/features/finance/components/BudgetCard";
// import CardBox from "@/shared/components/CardBox";
// import DataSection from "@/shared/components/DataSection";
// import FormInput from "@/shared/components/FormInput";
// import { useDataFilters } from "@/shared/hooks/use-data-filters";
// import { getCurrentYearMonth } from "@/utils/dateFormatter";
// import { formatRupiah } from "@/utils/rupiahFormatter";
// import { PlusIcon, ArrowRightIcon } from "@phosphor-icons/react";
// import Link from "next/link";

// export default function BudgetPage() {
//   const currentYM = getCurrentYearMonth(); // Menghasilkan "YYYY-MM" (misal: "2026-07")

//   // 1. Inisialisasi useDataFilters hanya dengan parameter `month` (format "YYYY-MM")
//   const { filters, activeFilters, handleFilterChange } = useDataFilters({
//     month: currentYM,
//   });

//   // 2. Kirim activeFilters langsung ke useBudgetAll (URL API akan otomatis ?month=2026-07)
//   const {
//     data: dataBudget = [],
//     isLoading: loadingBudget,
//     error: errorBudget,
//   } = useBudgetAll(activeFilters);

//   const {
//     data: dataSaving = [],
//     isLoading: loadingSaving,
//     error: errorSaving,
//   } = useSavingAll();

//   // Kalkulasi Summary Budget
//   const { totalBudgetAmount, totalSpentAmount, totalRemainingAmount } =
//     dataBudget.reduce(
//       (acc, item: any) => {
//         const amount = parseFloat(item.amount || "0");
//         const spent = Number(item.totalSpent || 0);
//         const remaining =
//           item.remaining !== undefined
//             ? Number(item.remaining)
//             : amount - spent;

//         return {
//           totalBudgetAmount: acc.totalBudgetAmount + amount,
//           totalSpentAmount: acc.totalSpentAmount + spent,
//           totalRemainingAmount: acc.totalRemainingAmount + remaining,
//         };
//       },
//       { totalBudgetAmount: 0, totalSpentAmount: 0, totalRemainingAmount: 0 },
//     );

//   // Kalkulasi Summary Saving Goals
//   const { totalTargetSaving, totalAchievedSaving } = dataSaving.reduce(
//     (acc, item: any) => {
//       const target = parseFloat(item.targetAmount || "0");
//       return {
//         totalTargetSaving: acc.totalTargetSaving + target,
//         totalAchievedSaving:
//           acc.totalAchievedSaving + (item.isCompleted ? target : 0),
//       };
//     },
//     { totalTargetSaving: 0, totalAchievedSaving: 0 },
//   );

//   return (
//     <div className="flex flex-col gap-10 max-w-7xl mx-auto pb-12">
//       {/* Header Utama Dashboard Analytics */}
//       <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
//             Eounia / Finance
//           </span>
//           <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
//             Financial Analytics
//           </h1>
//         </div>
//       </header>

//       {/* ================= SECTION 1: MONTHLY BUDGET OVERVIEW ================= */}
//       <section className="flex flex-col gap-4">
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//           <h2 className="text-body font-black uppercase tracking-wide text-base-content">
//             Monthly Budget
//           </h2>
//           <div className="flex flex-row gap-2">
//             <FormInput
//               type="month"
//               label=""
//               value={filters.month}
//               onChange={(val) => handleFilterChange("month", val)}
//             />
//             <CardBox
//               className="px-4 h-11 flex items-center gap-2 text-xs font-bold shadow-sm hover:shadow-md transition-all shrink-0 border-2 border-black"
//               rounded="xl"
//               color="accent"
//               href="/finance/analytics/create"
//               pressable
//             >
//               <PlusIcon weight="bold" size={16} />
//               <span>Set Budget</span>
//             </CardBox>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <CardBox
//             className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
//             rounded="xl"
//             color="primary"
//           >
//             <p className="text-caption font-bold uppercase tracking-wider text-base-content/70">
//               Total Allocated Budget
//             </p>
//             <h3 className="heading-h3 font-black text-base-content">
//               {formatRupiah(totalBudgetAmount)}
//             </h3>
//           </CardBox>
//           <CardBox
//             className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
//             rounded="xl"
//             color="secondary"
//           >
//             <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
//               Total Spent This Month
//             </p>
//             <h3 className="heading-h3 font-black text-neutral">
//               {formatRupiah(totalSpentAmount)}
//             </h3>
//           </CardBox>
//           <CardBox
//             className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
//             rounded="xl"
//             color="accent"
//           >
//             <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
//               Remaining Budget
//             </p>
//             <h3
//               className={`heading-h3 font-black ${totalRemainingAmount < 0 ? "text-error" : "text-neutral"}`}
//             >
//               {formatRupiah(totalRemainingAmount)}
//             </h3>
//           </CardBox>
//         </div>

//         <DataSection
//           loading={loadingBudget}
//           error={errorBudget}
//           data={dataBudget}
//         />
//         {!loadingBudget && !errorBudget && dataBudget.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {dataBudget.map((budget) => (
//               <BudgetCard key={budget.id} budget={budget} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ================= SECTION 2: SAVING GOALS OVERVIEW ================= */}
//       <section className="flex flex-col gap-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-body font-black uppercase tracking-wide text-base-content">
//             Saving Goals
//           </h2>
//           <Link
//             href="/finance/dashboard/pocket"
//             className="text-sm font-bold flex flex-row gap-2 items-center cursor-pointer hover:underline text-base-content"
//           >
//             Manage Pockets <ArrowRightIcon />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <CardBox
//             className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
//             rounded="xl"
//             color="primary"
//           >
//             <p className="text-caption font-bold uppercase tracking-wider text-base-content/70">
//               Total Saving Target
//             </p>
//             <h3 className="heading-h3 font-black text-base-content">
//               {formatRupiah(totalTargetSaving)}
//             </h3>
//           </CardBox>
//           <CardBox
//             className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
//             rounded="xl"
//             color="accent"
//           >
//             <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
//               Achieved Target
//             </p>
//             <h3 className="heading-h3 font-black text-neutral">
//               {formatRupiah(totalAchievedSaving)}
//             </h3>
//           </CardBox>
//         </div>

//         <DataSection
//           loading={loadingSaving}
//           error={errorSaving}
//           data={dataSaving}
//         />
//         {!loadingSaving && !errorSaving && dataSaving.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {dataSaving.map((saving) => (
//               <CardBox
//                 key={saving.id}
//                 className="p-5 flex flex-col justify-between gap-4"
//                 rounded="xl"
//               >
//                 <div className="flex flex-col gap-1">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-bold text-lg text-base-content">
//                       {saving.name}
//                     </h3>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-full font-bold ${saving.isCompleted ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}
//                     >
//                       {saving.isCompleted ? "Completed" : "On Track"}
//                     </span>
//                   </div>
//                   {saving.description && (
//                     <p className="text-sm text-base-content/70 line-clamp-2">
//                       {saving.description}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-1 border-t border-base-content/10 pt-3">
//                   <div className="flex justify-between text-xs text-base-content/60 font-semibold uppercase">
//                     <span>Target Amount</span>
//                     <span>Pocket: {saving.pocketName || "-"}</span>
//                   </div>
//                   <p className="text-xl font-extrabold text-base-content">
//                     {formatRupiah(saving.targetAmount)}
//                   </p>
//                 </div>
//               </CardBox>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
"use client";

import { useBudgetAll } from "@/features/finance/budgets/hooks/useBudgetsAll";
import { useSavingAll } from "@/features/finance/saving/hooks/useSavingAll";
import BudgetCard from "@/features/finance/components/BudgetCard";
import CardBox from "@/shared/components/CardBox";
import DataSection from "@/shared/components/DataSection";
import FormInput from "@/shared/components/FormInput";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import { getCurrentYearMonth } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { PlusIcon } from "@phosphor-icons/react";
import SavingCard from "@/features/finance/components/SavingCard";

export default function BudgetPage() {
  const currentYM = getCurrentYearMonth(); // Menghasilkan "YYYY-MM" (misal: "2026-07")

  const { filters, activeFilters, handleFilterChange } = useDataFilters({
    month: currentYM,
  });

  const {
    data: dataBudget = [],
    isLoading: loadingBudget,
    error: errorBudget,
  } = useBudgetAll(activeFilters);

  const {
    data: dataSaving = [],
    isLoading: loadingSaving,
    error: errorSaving,
  } = useSavingAll();

  const { totalBudgetAmount, totalSpentAmount, totalRemainingAmount } =
    dataBudget.reduce(
      (acc, item: any) => {
        const amount = parseFloat(item.amount || "0");
        const spent = Number(item.totalSpent || 0);
        const remaining =
          item.remaining !== undefined
            ? Number(item.remaining)
            : amount - spent;

        return {
          totalBudgetAmount: acc.totalBudgetAmount + amount,
          totalSpentAmount: acc.totalSpentAmount + spent,
          totalRemainingAmount: acc.totalRemainingAmount + remaining,
        };
      },
      { totalBudgetAmount: 0, totalSpentAmount: 0, totalRemainingAmount: 0 },
    );

  const { totalTargetSaving, totalAchievedSaving } = dataSaving.reduce(
    (acc, item: any) => {
      const target = parseFloat(item.targetAmount || "0");
      return {
        totalTargetSaving: acc.totalTargetSaving + target,
        totalAchievedSaving:
          acc.totalAchievedSaving + (item.isCompleted ? target : 0),
      };
    },
    { totalTargetSaving: 0, totalAchievedSaving: 0 },
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto pb-8 sm:pb-12">
      {/* Header Utama Dashboard Analytics */}
      {/* <header className="flex flex-col gap-1">
        <span className="text-caption uppercase">Eounia / Finance</span>
        <h1 className="heading-h1 uppercase tracking-tight text-base-content">
          Financial Analytics
        </h1>
      </header> */}

      {/* ================= SECTION 1: MONTHLY BUDGET OVERVIEW ================= */}
      <section className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          {/* Judul di sebelah kiri */}
          <h2 className="heading-h3 font-black uppercase tracking-wide text-base-content shrink-0">
            Monthly Budget
          </h2>

          {/* Container kanan: Input dan Button sejajar satu baris */}
          <div className="flex flex-row items-center gap-2">
            <FormInput
              type="month"
              label=""
              value={filters.month}
              onChange={(val) => handleFilterChange("month", val)}
              className="w-36 sm:w-48"
            />

            <CardBox
              className="px-4 py-3 flex items-center justify-center gap-2 text-body font-bold shrink-0 h-12"
              rounded="xl"
              color="accent"
              href="/finance/analytics/create"
              shadowSize="sm"
              pressable
            >
              <PlusIcon weight="bold" size={16} />
              <span className="hidden xs:inline sm:inline">Set Budget</span>
            </CardBox>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <CardBox
            className="px-2.5 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-start items-start gap-0.5 sm:gap-1"
            rounded="xl"
            color="primary"
          >
            <p className="text-caption uppercase text-base-content/70 leading-tight">
              Allocated
            </p>
            <h3 className="heading-h3 font-black text-base-content truncate w-full">
              {formatRupiah(totalBudgetAmount)}
            </h3>
          </CardBox>
          <CardBox
            className="px-2.5 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-start items-start gap-0.5 sm:gap-1"
            rounded="xl"
            color="secondary"
          >
            <p className="text-caption uppercase text-neutral/70 leading-tight">
              Spent
            </p>
            <h3 className="heading-h3 font-black text-neutral truncate w-full">
              {formatRupiah(totalSpentAmount)}
            </h3>
          </CardBox>
          <CardBox
            className="px-2.5 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-start items-start gap-0.5 sm:gap-1"
            rounded="xl"
            color="accent"
          >
            <p className="text-caption uppercase text-neutral/70 leading-tight">
              Remaining
            </p>
            <h3
              className={`heading-h3 font-black truncate w-full ${totalRemainingAmount < 0 ? "text-error" : "text-neutral"}`}
            >
              {formatRupiah(totalRemainingAmount)}
            </h3>
          </CardBox>
        </div>

        <DataSection
          loading={loadingBudget}
          error={errorBudget}
          data={dataBudget}
        />
        {!loadingBudget && !errorBudget && dataBudget.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {dataBudget.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </section>

      {/* ================= SECTION 2: SAVING GOALS OVERVIEW ================= */}
      <section className="flex flex-col gap-3 sm:gap-4">
        <div className="flex justify-between items-center">
          <h2 className="heading-h3 font-black uppercase tracking-wide text-base-content">
            Saving Goals
          </h2>
          <CardBox
            className="px-4 py-3 flex items-center justify-center gap-2 text-body font-bold shrink-0 h-12"
            rounded="xl"
            color="accent"
            href="/finance/analytics/create"
            shadowSize="sm"
            pressable
          >
            <PlusIcon weight="bold" size={16} />
            <span className="hidden xs:inline sm:inline">Set Budget</span>
          </CardBox>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <CardBox
            className="px-3 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-start items-start gap-0.5 sm:gap-1"
            rounded="xl"
            color="primary"
          >
            <p className="text-caption uppercase text-base-content/70 leading-tight">
              Saving Target
            </p>
            <h3 className="heading-h3 font-black text-base-content truncate w-full">
              {formatRupiah(totalTargetSaving)}
            </h3>
          </CardBox>
          <CardBox
            className="px-3 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-start items-start gap-0.5 sm:gap-1"
            rounded="xl"
            color="accent"
          >
            <p className="text-caption uppercase text-neutral/70 leading-tight">
              Achieved
            </p>
            <h3 className="heading-h3 font-black text-neutral truncate w-full">
              {formatRupiah(totalAchievedSaving)}
            </h3>
          </CardBox>
        </div>

        <DataSection
          loading={loadingSaving}
          error={errorSaving}
          data={dataSaving}
        />
        {!loadingSaving && !errorSaving && dataSaving.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {dataSaving.map((saving) => (
              <SavingCard key={saving.id} saving={saving} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
