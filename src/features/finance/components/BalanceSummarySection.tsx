"use client";

import { useState } from "react";
import { Eye, EyeSlash, TrendUpIcon } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";

export default function BalanceSummarySection() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <CardBox className="p-4 md:p-6 flex flex-col gap-3" rounded="2xl">
      <div className="flex flex-row justify-between items-center">
        <p className="text-caption font-bold uppercase tracking-widest text-base-content/60">
          Total Balance
        </p>
        <div className="flex items-center gap-3">
          <h2 className="heading-h2 font-black text-base-content">
            {showBalance ? "Rp 22.780.000" : "••••••••"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="opacity-50 hover:opacity-100 transition-opacity p-1 cursor-pointer"
            aria-label="Toggle Balance Visibility"
          >
            {showBalance ? <Eye size={20} /> : <EyeSlash size={20} />}
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Kotak Income */}
        <div className="bg-black/5 border-2 border-black/10 p-4 rounded-xl flex-1 flex flex-col gap-1">
          <p className="text-caption font-bold flex items-center gap-1 uppercase tracking-wider text-base-content/60">
            <TrendUpIcon /> Income (Jul)
          </p>
          <p className="text-body font-black text-success">
            {showBalance ? "Rp 5.500.000" : "••••••••"}
          </p>
        </div>

        {/* Kotak Expense */}
        <div className="bg-black/5 border-2 border-black/10 p-4 rounded-xl flex-1 flex flex-col gap-1">
          <p className="text-caption font-bold flex items-center gap-1 uppercase tracking-wider text-base-content/60">
            <TrendUpIcon className="rotate-180" /> Expense (Jul)
          </p>
          <p className="text-body font-black text-secondary">
            {showBalance ? "Rp 5.720.000" : "••••••••"}
          </p>
        </div>
      </div>
    </CardBox>
  );
}
