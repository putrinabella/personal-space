"use client";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import AccountCard from "@/features/finance/components/AccountCard";
import FinanceCard from "@/features/finance/components/FinanceCard";
import { usePocketsAll } from "@/features/finance/pockets/hooks/usePocketsAll";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  WalletIcon,
  PlusIcon,
  TrendUpIcon,
  ArrowRightIcon,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function FinancePage() {
  const [showBalance, setShowBalance] = useState(true);
  const { data: accounts } = useAccountsAll();
  const { data: pockets } = usePocketsAll();

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Asset Narrative
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
          <span className="hidden sm:block">New Entry</span>
        </CardBox>
      </header>
      <CardBox className="p-4 md:p-6 flex flex-col gap-2" rounded="2xl">
        <div className="flex flex-row justify-between">
          <p className="text-body uppercase tracking-widest opacity-70">
            Total Balance
          </p>
          <h2 className="heading-h2 font-black">Rp 22.780.000</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-black/10 p-4 rounded-xl flex-1">
            <p className="text-body flex items-center gap-1 opacity-70">
              <TrendUpIcon /> Income (Jul)
            </p>
            <p className="text-body font-bold">Rp 5.500.000</p>
          </div>
          <div className="bg-black/10 p-4 rounded-xl flex-1">
            <p className="text-body flex items-center gap-1 opacity-70">
              <TrendUpIcon className="rotate-180" /> Expense (Jul)
            </p>
            <p className="text-body font-bold">Rp 5.720.000</p>
          </div>
        </div>
      </CardBox>
      {/* Accounts Section */}
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-body font-black uppercase">Accounts</h2>
          <span className="text-sm font-bold flex flex-row gap-2 items-center cursor-pointer">
            See all <ArrowRightIcon />
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 pr-2">
          {accounts?.map((acc) => (
            <FinanceCard key={acc.id} item={acc} label="Account" />
          ))}
        </div>
      </section>

      {/* Pockets Section */}
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-body font-black uppercase">Pockets</h2>
          <span className="text-sm font-bold flex flex-row gap-2 items-center cursor-pointer">
            See all <ArrowRightIcon />
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 pr-2">
          {pockets?.map((pock) => (
            <FinanceCard key={pock.id} item={pock} label="Pocket" />
          ))}
        </div>
      </section>
    </div>
  );
}
