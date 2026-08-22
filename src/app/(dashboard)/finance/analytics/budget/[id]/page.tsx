"use client";
import { useState, use, useMemo } from "react";
import { FunnelIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import FormInput from "@/shared/components/FormInput";
import DataSection from "@/shared/components/DataSection";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import { useTransactionList } from "@/features/finance/transaction/hooks/useTransactionList";
import TransactionCard from "@/features/finance/components/TransactionCard";
import Pagination from "@/shared/components/Pagination";
import { getCurrentYearMonth } from "@/utils/dateFormatter";
import BalanceSummarySection from "@/features/finance/components/BalanceSummarySection";
import { useBudgetDetail } from "@/features/finance/budgets/hooks/useBudgetDetail";
export default function BudgetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [showFilters, setShowFilters] = useState(false);

  const {
    page,
    setPage,
    searchTitle,
    filters,
    activeFilters,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  } = useDataFilters({
    search: "",
    categoryId: id,
    month: getCurrentYearMonth(),
    status: "",
  });
  const handleResetAll = () => {
    resetFilters({ month: "" });
  };
  const {
    data: dataTransactions = [],
    loading: loadingTransactions,
    error: errorTransactions,
    lastPage,
    total,
    perPage,
  } = useTransactionList(page, activeFilters);

  const {
    data: dataBudget,
    loading: loadingBudget,
    error: errorBudget,
  } = useBudgetDetail(id);

  const { totalIncome, totalExpense } = useMemo(() => {
    return dataTransactions.reduce(
      (acc: { totalIncome: number; totalExpense: number }, tx: any) => {
        const amount = Number(tx.amount || 0);
        if (tx.type === "income") {
          acc.totalIncome += amount;
        } else if (tx.type === "expense") {
          acc.totalExpense += amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 },
    );
  }, [dataTransactions]);
  const activeFilterCount = [filters.month, filters.status].filter(
    Boolean,
  ).length;

  const groupedTransactions = dataTransactions.reduce(
    (acc: Record<string, any[]>, tx: any) => {
      const rawDate = tx.date || tx.createdAt || "Other Date";
      const dateKey = new Date(rawDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(tx);
      return acc;
    },
    {},
  );
  if (loadingBudget || errorBudget || !dataBudget) {
    return (
      <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
        <DataSection
          loading={loadingBudget}
          error={errorBudget}
          data={dataBudget}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance / Budget
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            {dataBudget.name}
          </h1>
        </div>
        <div className="w-full sm:w-auto"></div>
      </header>

      <BalanceSummarySection
        currentBalance={dataBudget.currentBalance}
        income={totalIncome}
        expense={totalExpense}
      />
      <CardBox className="p-4 md:p-6 flex flex-col gap-4" rounded="2xl">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <FormInput
              label="Search Transaction"
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="Search by description..."
            />
          </div>

          <div className="flex gap-2">
            <CardBox
              className="relative px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none border-2 border-black"
              rounded="xl"
              color={showFilters ? "accent" : "base-300"}
              onClick={() => setShowFilters((prev) => !prev)}
              pressable
            >
              <FunnelIcon weight="bold" size={18} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-error-content text-[10px] font-black flex items-center justify-center border-2 border-black">
                  {activeFilterCount}
                </span>
              )}
            </CardBox>

            <CardBox
              className="px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none border-2 border-black"
              rounded="xl"
              color="base-300"
              onClick={handleResetAll}
              pressable
            >
              <ArrowClockwiseIcon weight="bold" size={18} />
              <span>Reset</span>
            </CardBox>
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showFilters
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className={showFilters ? "overflow-visible" : "overflow-hidden"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t-2 border-black/10">
              <FormInput
                type="month"
                label="Month & Year"
                value={filters.month}
                onChange={(val) => handleFilterChange("month", val)}
              />

              <FormInput
                label="Status"
                value={filters.status}
                onChange={(val) => handleFilterChange("status", val)}
                options={[
                  { label: "Completed", value: "completed" },
                  { label: "Pending", value: "pending" },
                  { label: "Cancel", value: "cancel" },
                ]}
                dropdownType="select"
                placeholder="All Status"
                searchable={false}
              />
            </div>
          </div>
        </div>
      </CardBox>

      <section className="flex flex-col gap-4 md:gap-6">
        <h2 className="text-body font-black uppercase">Transaction History</h2>

        <DataSection
          loading={loadingTransactions}
          error={errorTransactions}
          data={dataTransactions}
        />

        {!loadingTransactions &&
          !errorTransactions &&
          dataTransactions.length > 0 && (
            <div className="flex flex-col gap-4 md:gap-6">
              {Object.entries(groupedTransactions).map(([dateLabel, txs]) => (
                <div key={dateLabel} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-base-300 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {dateLabel}
                    </span>
                    <div className="h-0.5 flex-1 bg-black/10" />
                  </div>

                  <div className="flex flex-col gap-3">
                    {txs.map((transaction: any) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
      </section>
      <Pagination
        page={page}
        lastPage={lastPage ?? 1}
        total={total ?? 0}
        perPage={perPage ?? 10}
        onPageChange={setPage}
      />
    </div>
  );
}
