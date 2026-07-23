"use client";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import BalanceSummarySection from "@/features/finance/components/BalanceSummarySection";
import FinanceCard from "@/features/finance/components/FinanceCard";
import { usePocketsAll } from "@/features/finance/pockets/hooks/usePocketsAll";
import { useSumarriesAll } from "@/features/finance/summaries/hooks/useSumarriesAll";
import { useTransactionAll } from "@/features/finance/transaction/hooks/useTransactionAll";
import { calculateTransactionCalendar } from "@/features/finance/transaction/hooks/useTransactionCalendar";
import CardBox from "@/shared/components/CardBox";
import DataSection from "@/shared/components/DataSection";
import UniversalCalendar from "@/shared/components/UniversalCalendar";
import { getCurrentYearMonth } from "@/utils/dateFormatter";
import { PlusIcon, ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function FinancePage() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentYearMonth());
  const { yearStr, monthStr } = useMemo(() => {
    const [year, month] = selectedMonth.split("-");
    return { yearStr: year, monthStr: month };
  }, [selectedMonth]);
  const {
    data: dataAccounts,
    isLoading: loadingAccount,
    error: errorAccount,
  } = useAccountsAll();

  const {
    data: dataPockets,
    isLoading: loadingPocket,
    error: errorPocket,
  } = usePocketsAll();
  const { data: summaryData } = useSumarriesAll({
    year: yearStr,
    month: monthStr,
  });
  const { data: transactions = [] } = useTransactionAll({
    month: selectedMonth,
  });
  const calendarData = useMemo(() => {
    return calculateTransactionCalendar(transactions);
  }, [transactions]);

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

      <BalanceSummarySection
        summary={summaryData}
        selectedMonth={selectedMonth}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-body font-black uppercase">Accounts</h2>
            <Link
              href="/finance/dashboard/account"
              className="text-sm font-bold flex flex-row gap-2 items-center cursor-pointer hover:underline"
            >
              See all <ArrowRightIcon />
            </Link>
          </div>
          <DataSection
            loading={loadingAccount}
            error={errorAccount}
            data={dataAccounts}
          />
          {!loadingAccount && !errorAccount && dataAccounts.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 pr-2 custom-horizontal-scroll">
              {dataAccounts.map((account) => (
                <FinanceCard key={account.id} item={account} label="Account" />
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-body font-black uppercase">Pockets</h2>
            <span className="text-sm font-bold flex flex-row gap-2 items-center cursor-pointer hover:underline">
              See all <ArrowRightIcon />
            </span>
          </div>
          <DataSection
            loading={loadingPocket}
            error={errorPocket}
            data={dataPockets}
          />
          {!loadingPocket && !errorPocket && dataAccounts.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 pr-2 custom-horizontal-scroll">
              {dataPockets.map((pocket) => (
                <FinanceCard key={pocket.id} item={pocket} label="Pocket" />
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="flex flex-col gap-2">
        <UniversalCalendar
          data={calendarData}
          title={""}
          onMonthChange={(yearMonth) => setSelectedMonth(yearMonth)}
        />
      </section>
    </div>
  );
}
