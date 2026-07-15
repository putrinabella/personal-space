"use client";

import { useState } from "react";
import CardHeader from "@/shared/components/CardHeader";
import CardSection from "@/shared/components/CardSection";
import Pagination from "@/shared/components/Pagination";
import { useCategoriesList } from "@/features/finance/categories/hooks/useCategoriesList";
import { usePocketsList } from "@/features/finance/pockets/hooks/usePocketsList";
import { Sliders, List, Plus } from "lucide-react";
import DataRenderer from "@/shared/components/DataRender";
import ActionButton from "@/shared/components/ActionButton";
import { SquaresFour } from "@phosphor-icons/react";
import { useAccountsList } from "@/features/finance/accounts/hooks/useAccountsList";
import { useRouter } from "next/navigation";
import { useCategoriesDelete } from "@/features/finance/categories/hooks/useCategoriesDelete";
import { usePocketsDelete } from "@/features/finance/pockets/hooks/usePocketsDelete";
import { useAccountsDelete } from "@/features/finance/accounts/hooks/useAccountsDelete";

import DataSection from "@/shared/components/DataSection";

const TAB_CONFIG = [
  { id: "accounts", label: "Accounts" },
  { id: "pockets", label: "Pockets" },
  { id: "categories", label: "Categories" },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const deleteCategories = useCategoriesDelete();
  const deletePockets = usePocketsDelete();
  const deleteAccounts = useAccountsDelete();
  const deleteHandlers = {
    categories: deleteCategories,
    pockets: deletePockets,
    accounts: deleteAccounts,
  };
  const [activeTab, setActiveTab] = useState<
    "categories" | "pockets" | "accounts"
  >("categories");

  const [viewType, setViewType] = useState<"list" | "card">("card");
  const [page, setPage] = useState(1);

  const categoriesQuery = useCategoriesList(
    page,
    undefined,
    activeTab === "categories",
  );

  const pocketsQuery = usePocketsList(page, undefined, activeTab === "pockets");

  const accountsQuery = useAccountsList(
    page,
    undefined,
    activeTab === "accounts",
  );
  const queries = {
    categories: categoriesQuery,
    pockets: pocketsQuery,
    accounts: accountsQuery,
  };
  const activeData = queries[activeTab];
  const renderNavButtons = () => (
    <div className="flex flex-col gap-2">
      {TAB_CONFIG.map((tab) => (
        <ActionButton
          key={tab.id}
          label={tab.label}
          size={14}
          className="w-full"
          disabled={activeTab === tab.id}
          color={activeTab === tab.id ? "primary" : "accent"}
          onClick={() => {
            setActiveTab(tab.id as any);
            setPage(1);
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader title="S E T T I N G S" icon={Sliders} color="accent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <CardSection
              title="Data Management"
              headerColor="primary"
              rounded="3xl"
            >
              {renderNavButtons()}
            </CardSection>

            <CardSection title="View Options" headerColor="primary">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setViewType("card")}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
        ${
          viewType === "card"
            ? "border-primary bg-primary/10 text-primary"
            : "border-base-200 bg-base-100 hover:border-base-300"
        }`}
                >
                  <SquaresFour
                    size={24}
                    weight={viewType === "card" ? "fill" : "regular"}
                  />
                  <span className="font-bold text-sm">Grid</span>
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
        ${
          viewType === "list"
            ? "border-primary bg-primary/10 text-primary"
            : "border-base-200 bg-base-100 hover:border-base-300"
        }`}
                >
                  <List size={24} />
                  <span className="font-bold text-sm">List</span>
                </button>
              </div>
            </CardSection>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-6">
            <CardSection
              title={`${TAB_CONFIG.find((t) => t.id === activeTab)?.label} List`}
              action={
                <ActionButton
                  label="Add New"
                  icon={Plus}
                  color="primary"
                  to={`/finance/settings/${activeTab}/create`}
                />
              }
            >
              <div>
                <DataSection
                  loading={activeData.loading}
                  error={activeData.error}
                  data={activeData.data}
                />
                {!activeData.loading &&
                  !activeData.error &&
                  activeData.data.length > 0 && (
                    <DataRenderer
                      data={activeData.data}
                      viewType={viewType}
                      onEdit={(item) => {
                        router.push(
                          `/finance/settings/${activeTab}/${item.id}/edit`,
                        );
                      }}
                      onDelete={(item) => {
                        const handler = deleteHandlers[activeTab];
                        if (handler) {
                          handler.handleDelete(item.id);
                        }
                      }}
                    />
                  )}

                <Pagination
                  page={page}
                  lastPage={activeData.lastPage}
                  total={activeData.total}
                  perPage={activeData.perPage}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            </CardSection>
          </div>
        </div>
      </div>
    </div>
  );
}
