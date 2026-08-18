"use client";

import { useState } from "react";
import CardHeader from "@/shared/components/CardHeader";
import CardSection from "@/shared/components/CardSection";
import Pagination from "@/shared/components/Pagination";
import { useCategoriesList } from "@/features/beauty/categories/hooks/useCategoriesList";
import { useBrandsList } from "@/features/beauty/brands/hooks/useBrandsList";
import { Sliders, List, Plus } from "lucide-react";
import DataRenderer from "@/shared/components/DataRender";
import ActionButton from "@/shared/components/ActionButton";
import { SquaresFour } from "@phosphor-icons/react";
import { useStoresList } from "@/features/beauty/stores/hooks/useStoresList";
import { useRouter } from "next/navigation";
import { useCategoriesDelete } from "@/features/beauty/categories/hooks/useCategoriesDelete";
import { useBrandsDelete } from "@/features/beauty/brands/hooks/useBrandsDelete";
import { useStoresDelete } from "@/features/beauty/stores/hooks/useStoresDelete";

import DataSection from "@/shared/components/DataSection";
import { useConcernsDelete } from "@/features/beauty/concerns/hooks/useConcernsDelete";
import { useConcernsList } from "@/features/beauty/concerns/hooks/useConcernsList";

const TAB_CONFIG = [
  { id: "brands", label: "Brands" },
  { id: "categories", label: "Categories" },
  { id: "concerns", label: "Concerns" },
  { id: "stores", label: "Stores" },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const deleteCategories = useCategoriesDelete();
  const deleteBrands = useBrandsDelete();
  const deleteStores = useStoresDelete();
  const deleteConcerns = useConcernsDelete();

  const deleteHandlers = {
    categories: deleteCategories,
    brands: deleteBrands,
    stores: deleteStores,
    concerns: deleteConcerns,
  };
  const [activeTab, setActiveTab] = useState<
    "categories" | "brands" | "stores" | "concerns"
  >("concerns");

  const [viewType, setViewType] = useState<"list" | "card">("card");
  const [page, setPage] = useState(1);

  const categoriesQuery = useCategoriesList(
    page,
    undefined,
    activeTab === "categories",
  );

  const brandsQuery = useBrandsList(page, undefined, activeTab === "brands");

  const storesQuery = useStoresList(page, undefined, activeTab === "stores");
  const concernsQuery = useConcernsList(
    page,
    undefined,
    activeTab === "concerns",
  );
  const queries = {
    categories: categoriesQuery,
    brands: brandsQuery,
    stores: storesQuery,
    concerns: concernsQuery,
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
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <CardHeader title="S E T T I N G S" icon={Sliders} color="accent" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
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
          <div className="flex flex-col gap-4 md:gap-6">
            <CardSection
              title={`${TAB_CONFIG.find((t) => t.id === activeTab)?.label} List`}
              action={
                <ActionButton
                  label="Add New"
                  icon={Plus}
                  color="primary"
                  to={`/beauty/settings/${activeTab}/create`}
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
                      entity={activeTab}
                      data={activeData.data}
                      viewType={viewType}
                      onEdit={(item: any) => {
                        router.push(
                          `/beauty/settings/${activeTab}/${item.id}/edit`,
                        );
                      }}
                      onDelete={(item: any) => {
                        const handler = deleteHandlers[activeTab];
                        if (handler) {
                          handler.handleDelete(item.id);
                        }
                      }}
                    />
                  )}

                <Pagination
                  page={page}
                  lastPage={activeData.lastPage ?? 1}
                  total={activeData.total ?? 0}
                  perPage={activeData.perPage ?? 10}
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
