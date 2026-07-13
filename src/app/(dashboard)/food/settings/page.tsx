"use client";

import { useState } from "react";
import CardHeader from "@/shared/components/CardHeader";
import CardSection from "@/shared/components/CardSection";
import Pagination from "@/shared/components/Pagination";
import { useCategoriesList } from "@/features/food/categories/hooks/useCategoriesList";
import { useCuisinesList } from "@/features/food/cuisines/hooks/useCuisinesList";
import { Sliders, List, Plus } from "lucide-react";
import DataRenderer from "@/shared/components/DataRender";
import ActionButton from "@/shared/components/ActionButton";
import { SquaresFour } from "@phosphor-icons/react";
import { useTagsList } from "@/features/food/tags/hooks/useTagList";
import { useDiningTypeList } from "@/features/food/diningType/hooks/useDiningTypeList";
import { useRouter } from "next/navigation";
import { useCategoriesDelete } from "@/features/food/categories/hooks/useCategoriesDelete";
import { useCuisinesDelete } from "@/features/food/cuisines/hooks/useCuisinesDelete";
import { useDiningTypeDelete } from "@/features/food/diningType/hooks/useDiningTypeDelete";
import { useTagDelete } from "@/features/food/tags/hooks/useTagDelete";
import DataSection from "@/shared/components/DataSection";

const TAB_CONFIG = [
  { id: "categories", label: "Categories" },
  { id: "cuisines", label: "Cuisines" },
  { id: "diningType", label: "Dining Type" },
  { id: "tags", label: "Tag" },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const deleteCategories = useCategoriesDelete();
  const deleteCuisines = useCuisinesDelete();
  const deleteDiningType = useDiningTypeDelete();
  const deleteTags = useTagDelete();

  // Pemetaan untuk mempermudah akses
  const deleteHandlers = {
    categories: deleteCategories,
    cuisines: deleteCuisines,
    diningType: deleteDiningType,
    tags: deleteTags,
  };
  // 1. State untuk navigasi dan tampilan
  const [activeTab, setActiveTab] = useState<
    "categories" | "cuisines" | "diningType" | "tags"
  >("categories");

  const [viewType, setViewType] = useState<"list" | "card">("card");
  const [page, setPage] = useState(1);

  const categoriesQuery = useCategoriesList(
    page,
    undefined,
    activeTab === "categories",
  );

  const cuisinesQuery = useCuisinesList(
    page,
    undefined,
    activeTab === "cuisines",
  );

  const diningTypeQuery = useDiningTypeList(
    page,
    undefined,
    activeTab === "diningType",
  );

  const tagsQuery = useTagsList(page, undefined, activeTab === "tags");
  // Pastikan semua query terdaftar di sini
  const queries = {
    categories: categoriesQuery,
    cuisines: cuisinesQuery,
    diningType: diningTypeQuery,
    tags: tagsQuery,
  };

  // Ambil data yang aktif secara dinamis
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

            <CardSection
              title="View Options"
              headerColor="primary"
              // variant="normal"
            >
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
                  to={`/food/settings/${activeTab}/create`}
                  // onClick={() => router.push(`/settings/${activeTab}/create`)}
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
                        // Navigasi ke path edit berdasarkan ID item
                        router.push(
                          `/food/settings/${activeTab}/${item.id}/edit`,
                        );
                      }}
                      onDelete={(item) => {
                        const handler = deleteHandlers[activeTab];
                        if (handler) {
                          // Panggil handleDelete, BUKAN .mutate()
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
