"use client";

import CardBox from "@/shared/components/CardBox";
import { formatRupiah } from "@/utils/rupiahFormatter";

export default function BudgetPage() {
  const totalBudgetAmount = 100000;
  const totalSpentAmount = 100000;
  const totalRemainingAmount = 100000;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Monthly Budget
          </h1>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-base-100"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-base-content/70">
            Total Allocated Budget
          </p>
          <h3 className="heading-h3 font-black mt-1 text-base-content">
            {formatRupiah(totalBudgetAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-warning/30"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Total Spent This Month
          </p>
          <h3 className="heading-h3 font-black mt-1 text-neutral">
            {formatRupiah(totalSpentAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-success/30"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Remaining Budget
          </p>
          <h3
            className={`heading-h3 font-black mt-1 ${totalRemainingAmount < 0 ? "text-error" : "text-neutral"}`}
          >
            {formatRupiah(totalRemainingAmount)}
          </h3>
        </CardBox>
      </div>
    </div>
  );
}
