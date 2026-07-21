"use client";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import { usePocketsAll } from "@/features/finance/pockets/hooks/usePocketsAll";
import { useTransactionAll } from "@/features/finance/transaction/hooks/useTransactionAll";
import CardBox from "@/shared/components/CardBox";
import { WalletIcon, PlusIcon, TrendUpIcon } from "@phosphor-icons/react";

export default function FinancePage() {
  const { data: accounts } = useAccountsAll();
  const { data: pockets } = usePocketsAll();
  const { data: transactions } = useTransactionAll();
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">
            Accounts
          </h2>
          <div className="grid gap-4">
            {accounts.map((acc) => (
              <CardBox
                key={acc.id}
                className="p-4 flex justify-between items-center"
              >
                <span className="font-bold">{acc.name}</span>
                <span className="text-data">
                  Rp {Number(acc.currentBalance).toLocaleString()}
                </span>
              </CardBox>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">
            Pockets
          </h2>
          <div className="grid gap-4">
            {pockets.map((p) => (
              <CardBox
                key={p.id}
                className="p-4 flex justify-between items-center"
              >
                <span className="font-bold">{p.name}</span>
                <span className="text-data">
                  Rp {Number(p.currentBalance).toLocaleString()}
                </span>
              </CardBox>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">
          Recent Transactions
        </h2>
        <CardBox className="p-0">
          {transactions.slice(0, 10).map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between p-4 border-b border-base-200 last:border-0"
            >
              <div>
                <p className="font-bold">{tx.description}</p>
                <p className="text-caption">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`font-bold ${tx.type === "expense" ? "text-error" : "text-success"}`}
              >
                {tx.type === "expense" ? "-" : "+"} Rp{" "}
                {Number(tx.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </CardBox>
      </section>
    </div>
  );
}
