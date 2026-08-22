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
  const currentYM = getCurrentYearMonth();

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
    <div className="flex flex-col gap-4 md:gap-6 sm:gap-8 max-w-7xl mx-auto pb-8 sm:pb-12">
      {/* <header className="flex flex-col gap-1">
        <span className="text-caption uppercase">Eounia / Finance</span>
        <h1 className="heading-h1 uppercase tracking-tight text-base-content">
          Financial Analytics
        </h1>
      </header> */}

      <section className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <h2 className="heading-h3 font-black uppercase tracking-wide text-base-content shrink-0">
            Monthly Budget
          </h2>

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
              href="/finance/analytics/budget/create"
              shadowSize="sm"
              pressable
            >
              <PlusIcon weight="bold" size={16} />
              <span className="hidden xs:inline sm:inline">Set Budget</span>
            </CardBox>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          <CardBox
            className="px-2.5 py-2.5 sm:px-6 sm:py-3  flex-col justify-start items-start gap-0.5 sm:gap-1 hidden md:flex"
            rounded="xl"
            color="accent"
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
            color="primary"
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
        </div>

        <DataSection
          loading={loadingBudget}
          error={errorBudget}
          data={dataBudget}
        />
        {!loadingBudget && !errorBudget && dataBudget.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {dataBudget.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3 sm:gap-4">
        <div className="flex justify-between items-center">
          <h2 className="heading-h3 font-black uppercase tracking-wide text-base-content">
            Saving Goals
          </h2>
          <CardBox
            className="px-4 py-3 flex items-center justify-center gap-2 text-body font-bold shrink-0 h-12"
            rounded="xl"
            color="secondary"
            href="/finance/analytics/saving/create"
            shadowSize="sm"
            pressable
          >
            <PlusIcon weight="bold" size={16} />
            <span className="hidden xs:inline sm:inline">Set Goal</span>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {dataSaving.map((saving) => (
              <SavingCard key={saving.id} saving={saving} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
