"use client";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import BalanceOverview from "@/features/finance/components/BalanceOverview";
import GroupedFinanceList from "@/features/finance/components/GroupedFinanceList";
import DataSection from "@/shared/components/DataSection";

export default function AccountPage() {
  const {
    data: dataAccounts = [],
    isLoading: loadingAccount,
    error: errorAccount,
  } = useAccountsAll();

  const totalBalance = dataAccounts.reduce(
    (sum, account: any) => sum + Number(account.currentBalance || 0),
    0,
  );
  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Accounts
          </h1>
        </div>

        <div className="w-full sm:w-auto">
          {/* <BalanceOverview
            amount={totalBalance}
            subLabel={`${dataAccounts.length} Accounts`}
          /> */}
        </div>
      </header>
      <BalanceOverview
        amount={totalBalance}
        subLabel={`${dataAccounts.length} Accounts`}
      />
      <section className="flex flex-col gap-4">
        <DataSection
          loading={loadingAccount}
          error={errorAccount}
          data={dataAccounts}
        />

        {!loadingAccount && !errorAccount && dataAccounts.length > 0 && (
          <div className="flex flex-col gap-3">
            <GroupedFinanceList
              items={dataAccounts}
              baseRoute="/finance/dashboard/account"
            />
          </div>
        )}
      </section>
    </div>
  );
}
