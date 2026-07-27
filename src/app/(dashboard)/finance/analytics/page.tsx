"use client";

import { useBudgetAll } from "@/features/finance/budgets/hooks/useBudgetsAll";
import BudgetCard from "@/features/finance/components/BudgetCard";
import CardBox from "@/shared/components/CardBox";
import DataSection from "@/shared/components/DataSection";
import { getCurrentYearMonth } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { PlusIcon } from "@phosphor-icons/react";

export default function BudgetPage() {
  const currentYM = getCurrentYearMonth(); // format "YYYY-MM"
  const [year, month] = currentYM.split("-");

  const {
    data: dataBudget,
    isLoading: loadingBudget,
    error: errorBudget,
  } = useBudgetAll({
    month,
    year,
  });
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
  return (
    <div className="flex flex-col gap-8 max-w-72xl mx-auto">
      <header className="flex items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Monthly Budget
          </h1>
        </div>
        <CardBox
          className="px-3 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0"
          rounded="xl"
          color="accent"
          href="/finance/analytics/create"
          pressable
        >
          <PlusIcon weight="bold" size={20} />
          <span className="hidden sm:block">Set Budget</span>
        </CardBox>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardBox
          className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
          rounded="xl"
          color="primary"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-base-content/70">
            Total Allocated Budget
          </p>
          <h3 className="heading-h3 font-black text-base-content">
            {formatRupiah(totalBudgetAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
          rounded="xl"
          color="secondary"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Total Spent This Month
          </p>
          <h3 className="heading-h3 font-black text-neutral">
            {formatRupiah(totalSpentAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="px-6 py-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-1"
          rounded="xl"
          color="accent"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Remaining Budget
          </p>
          <h3
            className={`heading-h3 font-black ${totalRemainingAmount < 0 ? "text-error" : "text-neutral"}`}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataBudget.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
}
