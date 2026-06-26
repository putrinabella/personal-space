"use client";

import { useState } from "react";
import CardHeader from "@/components/CardHeader";
import CardSection from "@/components/CardSection";
import Pagination from "@/components/Pagination";
import { useCategoriesList } from "@/features/food/categories/hooks/useCategoriesList";
import { useCuisinesList } from "@/features/food/cuisines/hooks/useCuisinesList";
import { Paintbrush, Sliders, List, Grid, Plus } from "lucide-react";
import DataRenderer from "@/components/DataRender";
import ActionButton from "@/components/ActionButton";
import { SquaresFour } from "@phosphor-icons/react";
import { useDiningTypeList } from "@/features/food/diningTypes/hooks/useDiningTypeList";
import { useTagsList } from "@/features/food/tags/hooks/useTagasList";

const TAB_CONFIG = [
  { id: "categories", label: "Categories" },
  { id: "cuisines", label: "Cuisines" },
  { id: "diningType", label: "Dining Type" },
  { id: "tags", label: "Tag" },
] as const;

export default function SettingsPage() {
  // 1. State untuk navigasi dan tampilan
  const [activeTab, setActiveTab] = useState<
    "categories" | "cuisines" | "diningType" | "tags"
  >("categories");

  const [viewType, setViewType] = useState<"list" | "card">("card");
  const [page, setPage] = useState(1);

  const categoriesQuery = useCategoriesList(page);
  const cuisinesQuery = useCuisinesList(page);
  const diningTypeQuery = useDiningTypeList(page);
  const tagsQuery = useTagsList(page);
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
          color={activeTab === tab.id ? "primary" : "secondary"}
          onClick={() => {
            setActiveTab(tab.id as any);
            setPage(1);
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
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
              headerColor="secondary"
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

        {/* KANAN: KONTEN DINAMIS */}
        <div className="md:col-span-2">
          <div className="flex flex-col gap-6">
            <CardSection
              title={
                activeTab === "categories" ? "Categories List" : "Cuisines List"
              }
              action={
                <ActionButton
                  label="Add New"
                  icon={Plus}
                  color="primary"
                  onClick={() => {
                    /* handle open modal */
                  }}
                />
              }
            >
              {activeData.loading ? (
                <div className="p-8 text-center">Loading data...</div>
              ) : (
                <DataRenderer
                  data={activeData.data}
                  viewType={viewType}
                  onEdit={(item) => console.log("Edit", item)}
                  onDelete={(item) => console.log("Delete", item)}
                />
              )}

              <Pagination
                page={page}
                lastPage={activeData.lastPage}
                total={activeData.total}
                perPage={activeData.perPage}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </CardSection>

            {/* Bagian Bawah */}
            <CardSection
              title="Additional Information"
              headerColor="base-200"
              variant="normal"
            >
              <p>Supporting content goes here...</p>
            </CardSection>

            <CardSection title="THEME & APPEARANCE" icon={Paintbrush}>
              <p className="text-sm font-bold text-neutral/70">
                Theme customization options will be available soon! ✨
              </p>
            </CardSection>
          </div>
        </div>
      </div>
    </div>
  );
}
