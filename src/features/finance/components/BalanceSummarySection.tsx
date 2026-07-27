"use client";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { getMonthShortName } from "@/utils/dateFormatter";

interface BalanceSummarySectionProps {
  currentBalance?: any;
  income?: any;
  expense?: any;
  selectedMonth?: string; // Format "YYYY-MM", contoh: "2026-07"
}

export default function BalanceSummarySection({
  currentBalance = 0,
  income = 0,
  expense = 0,
  selectedMonth,
}: BalanceSummarySectionProps) {
  const [showTotal, setShowTotal] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  // Ambil nilai langsung dari props terpisah dengan fallback 0
  const currentTotalBalance = Number(currentBalance || 0);
  const currentIncome = Number(income || 0);
  const currentExpense = Number(expense || 0);

  const monthLabel = getMonthShortName(selectedMonth);
  return (
    <CardBox
      className="p-4 md:p-5 flex flex-col gap-4 border-2"
      rounded="2xl"
      color="base-100"
    >
      <div className="pb-2 border-b-2 border-black/10">
        {/* --- TAMPILAN MOBILE --- */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-caption font-black uppercase tracking-widest text-base-content/70">
              Total Balance
            </p>
            <h2 className="heading-h2 font-black text-base-content tracking-tight truncate">
              {showTotal ? formatRupiah(currentTotalBalance) : "••••••••"}
            </h2>
          </div>
          <CardBox
            className="w-10 h-10 p-0 flex items-center justify-center font-bold shrink-0"
            rounded="xl"
            shadowSize="xs"
            color="base-300"
            onClick={() => setShowTotal(!showTotal)}
            pressable
          >
            {showTotal ? (
              <Eye size={18} weight="bold" />
            ) : (
              <EyeSlash size={18} weight="bold" />
            )}
          </CardBox>
        </div>

        {/* --- TAMPILAN DESKTOP --- */}
        <div className="hidden sm:flex sm:items-center justify-between gap-2">
          <p className="text-caption font-black uppercase tracking-widest text-base-content/70">
            Total Balance
          </p>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <h2 className="heading-h2 font-black text-base-content tracking-tight">
              {showTotal ? formatRupiah(currentTotalBalance) : "••••••••"}
            </h2>
            <CardBox
              className="w-10 h-10 p-0 flex items-center justify-center font-bold shrink-0"
              rounded="xl"
              shadowSize="xs"
              color="base-300"
              onClick={() => setShowTotal(!showTotal)}
              pressable
            >
              {showTotal ? (
                <Eye size={18} weight="bold" />
              ) : (
                <EyeSlash size={18} weight="bold" />
              )}
            </CardBox>
          </div>
        </div>
      </div>

      {/* Income & Expense Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Kotak Income */}
        <div className="bg-success/40 border-2 border-black p-3 md:p-4 rounded-xl flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <p className="text-caption font-black uppercase tracking-wider text-neutral/70 truncate">
              Income ({monthLabel})
            </p>
            <button
              onClick={() => setShowIncome(!showIncome)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-base-100 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 transition-all cursor-pointer shrink-0"
              aria-label="Toggle Income Visibility"
            >
              {showIncome ? (
                <Eye size={13} weight="bold" />
              ) : (
                <EyeSlash size={13} weight="bold" />
              )}
            </button>
          </div>
          <div>
            <p className="text-sm md:text-lg font-black text-neutral tracking-tight">
              {showIncome ? formatRupiah(currentIncome) : "••••••••"}
            </p>
          </div>
        </div>

        {/* Kotak Expense */}
        <div className="bg-secondary/40 border-2 border-black p-3 md:p-4 rounded-xl flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <p className="text-caption font-black uppercase tracking-wider text-neutral/70 truncate">
              Expense ({monthLabel})
            </p>
            <button
              onClick={() => setShowExpense(!showExpense)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-base-100 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 transition-all cursor-pointer shrink-0"
              aria-label="Toggle Expense Visibility"
            >
              {showExpense ? (
                <Eye size={13} weight="bold" />
              ) : (
                <EyeSlash size={13} weight="bold" />
              )}
            </button>
          </div>
          <div>
            <p className="text-sm md:text-lg font-black text-neutral tracking-tight">
              {showExpense ? formatRupiah(currentExpense) : "••••••••"}
            </p>
          </div>
        </div>
      </div>
    </CardBox>
  );
}
