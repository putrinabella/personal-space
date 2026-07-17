"use client";
import CardBox from "@/shared/components/CardBox";
import { WalletIcon, PlusIcon, TrendUpIcon } from "@phosphor-icons/react";

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content mb-2 block">
            Eounia / Finance
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#2D2A2A]">
            Asset Narrative
          </h1>
          <p className="text-base-content mt-2 text-body md:text-base font-medium italic">
            "Documenting the journey of resources, grounding every humble
            pursuit."
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-body md:text-base font-bold"
            rounded="xl"
            color="secondary"
            pressable
          >
            <TrendUpIcon weight="bold" size={18} />
            <span>Overview</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-body md:text-base font-bold"
            rounded="xl"
            color="accent"
            href="/finance/dashboard/create"
            pressable
          >
            <PlusIcon weight="bold" size={18} />
            <span>New Entry</span>
          </CardBox>
        </div>
      </header>
    </div>
  );
}
