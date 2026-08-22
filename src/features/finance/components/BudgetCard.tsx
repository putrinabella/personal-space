"use client";

import { useState } from "react";
import { CheckCircle, Warning, X } from "@phosphor-icons/react";
import { BudgetsEntry } from "../budgets/budgets.types";
import { formatRupiah } from "@/utils/rupiahFormatter";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import TransactionCard from "./TransactionCard";

interface BudgetCardProps {
  budget: BudgetsEntry;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targetLimit = parseFloat(budget.amount || "0");
  const totalSpent = (budget as any).totalSpent || 0;
  const remaining = (budget as any).remaining || targetLimit - totalSpent;
  const percentage =
    (budget as any).percentage ||
    (targetLimit > 0 ? (totalSpent / targetLimit) * 100 : 0);

  const isOverBudget = percentage > 100;

  let progressColor = "bg-primary";
  let badgeColor = "bg-primary/80";

  if (isOverBudget) {
    progressColor = "bg-error";
    badgeColor = "bg-error/80";
  } else if (percentage >= 85) {
    progressColor = "bg-warning";
    badgeColor = "bg-warning/80";
  }

  const categoryName = budget.category?.name || "Category";
  const categoryColor = budget.category?.color || budget.color || "#e4e4e7";
  const iconSlug = budget.category?.iconSlug || "Folder";
  const transactions = (budget as any).transactions || [];

  return (
    <>
      <CardBox
        className="relative p-3 sm:p-4 flex flex-col gap-2.5 mt-3 cursor-pointer hover:bg-primary/10 transition-colors"
        rounded="2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={`absolute top-0 right-4 ${badgeColor} px-2 py-1 rounded-b-lg shadow-sm z-10`}
        >
          <div className="flex items-center gap-1 text-caption text-base-content font-bold">
            {isOverBudget ? (
              <Warning size={12} weight="bold" />
            ) : (
              <CheckCircle size={12} weight="bold" />
            )}
            <span>{percentage.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl border-2 border-neutral flex items-center justify-center text-neutral shadow-[2px_2px_0px_0px_#4a3e3d]"
              style={{ backgroundColor: categoryColor }}
            >
              <IconRenderer name={iconSlug} size={18} weight="bold" />
            </div>
            <div className="min-w-0">
              <h3 className="heading-h4 truncate">{categoryName}</h3>
              <p className="text-caption truncate">
                {formatRupiah(targetLimit)}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-base-200 border border-neutral/40 h-1.5 sm:h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-1 border-t border-base-content/10">
          <div className="flex flex-row justify-between md:gap-2">
            <span className="text-caption uppercase font-semibold">Spent</span>
            <span className="text-data truncate">
              {formatRupiah(totalSpent)}
            </span>
          </div>
          <div className="flex flex-row justify-between md:gap-2">
            <span className="text-caption uppercase font-semibold">Left</span>
            <span
              className={`text-data truncate ${remaining < 0 ? "text-error font-bold" : ""}`}
            >
              {formatRupiah(remaining)}
            </span>
          </div>
        </div>
      </CardBox>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardBox
              className="max-h-[80vh] overflow-y-auto p-5 flex flex-col gap-4 border-4"
              rounded="2xl"
              color="base-100"
            >
              <div className="flex justify-between items-start mb-1 gap-4">
                <div>
                  <span className="text-caption font-bold uppercase tracking-widest text-base-content/60 block mb-0.5">
                    Budget Transactions
                  </span>
                  <h3 className="heading-h4 font-black text-neutral">
                    {categoryName}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 border-2 border-black text-base-content hover:bg-base-300 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CardBox
                  className="p-3 flex flex-col w-full"
                  rounded="xl"
                  color="accent"
                  shadowSize="sm"
                >
                  <span className="text-caption font-bold opacity-70 uppercase">
                    Total Budget
                  </span>
                  <span className="text-body font-black text-base-content">
                    {formatRupiah(targetLimit)}
                  </span>
                </CardBox>

                <CardBox
                  className="p-3 flex flex-col w-full"
                  rounded="xl"
                  color="secondary"
                  shadowSize="sm"
                >
                  <span className="text-caption font-bold opacity-70 uppercase">
                    Total Spent
                  </span>
                  <span className="text-body font-black text-base-content">
                    {formatRupiah(totalSpent)}
                  </span>
                </CardBox>
              </div>

              <div className="flex flex-col gap-3 mt-1">
                {transactions.length > 0 ? (
                  transactions.map((tx: any) => (
                    <TransactionCard key={tx.id} transaction={tx} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                    <p className="text-body font-bold text-neutral/50">
                      No transactions on this budget yet.
                    </p>
                  </div>
                )}
              </div>
            </CardBox>
          </div>
        </div>
      )}
    </>
  );
}
