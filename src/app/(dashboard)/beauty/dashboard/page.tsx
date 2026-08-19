"use client";

import CardBox from "@/shared/components/CardBox";
import { PlusIcon } from "@phosphor-icons/react";

export default function SkincareDashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <header className="flex items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Inventory
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Product Inventory
          </h1>
        </div>
        <CardBox
          className="px-3 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0"
          rounded="xl"
          color="accent"
          href="/finance/dashboard/create"
          pressable
        >
          <PlusIcon weight="bold" size={20} />
          <span className="hidden sm:block">Add Product</span>
        </CardBox>
      </header>
    </div>
  );
}
