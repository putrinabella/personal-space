"use client";

import { AlertEntry } from "@/features/beauty/alert/alert.types";
import { useAlertAll } from "@/features/beauty/alert/hooks/useAlertAll";
import { useBrandsAll } from "@/features/beauty/brands/hooks/useBrandsAll";
import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";
import ProductAlerts from "@/features/beauty/components/ProductAlerts";
import ProductCard from "@/features/beauty/components/ProductCard";
import { useConcernsAll } from "@/features/beauty/concerns/hooks/useConcernsAll";
import { useProductList } from "@/features/beauty/product/hooks/useProductList";
import CardBox from "@/shared/components/CardBox";
import DataSection from "@/shared/components/DataSection";
import FormInput from "@/shared/components/FormInput";
import Pagination from "@/shared/components/Pagination";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import {
  ArrowClockwiseIcon,
  FunnelIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function SkincareDashboardPage() {
  const [showFilters, setShowFilters] = useState(false);
  const {
    page,
    setPage,
    searchTitle,
    filters,
    activeFilters,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  } = useDataFilters({
    categoryId: "",
    brandId: "",
    storeId: "",
    status: "",
    concernId: "",
    expiryWindow: "",
    stockStatus: "",
    search: "",
  });

  const {
    data: dataProduct,
    loading: loadingProduct,
    error: errorProduct,
    lastPage,
    total,
    perPage,
  } = useProductList(page, activeFilters);

  const { data: dataCategories, isLoading: loadingCategories } =
    useCategoriesAll();
  const { data: dataBrand, isLoading: loadingBrand } = useBrandsAll();
  const { data: dataConcern, isLoading: loadingConcern } = useConcernsAll();

  const { data, isLoading: loadingAlerts } = useAlertAll();
  const alertData = data as unknown as AlertEntry;

  const parentCategories = dataCategories.filter(
    (category: any) => category.parentId == null,
  );

  const statusOptions = [
    { label: "Select Status", value: "" },
    { label: "Active", value: "active" },
    { label: "Backup", value: "backup" },
    { label: "Finished", value: "finished" },
    { label: "Discarded", value: "discarded" },
  ];

  const activeFilterCount = [
    filters.categoryId,
    filters.brandId,
    filters.status,
    filters.concernId,
    filters.expiryWindow,
    filters.stockStatus,
  ].filter(Boolean).length;

  const expiredUnits = alertData?.expiredUnits ?? [];
  const expiringSoon = alertData?.expiringSoon ?? [];
  const paoWarning = alertData?.paoWarning ?? [];
  const totalAlerts =
    expiredUnits.length + expiringSoon.length + paoWarning.length;

  const activeCardsCount = [expiredUnits, expiringSoon, paoWarning].filter(
    (items) => items.length > 0,
  ).length;

  const alertGridClass = `grid gap-4 ${
    activeCardsCount === 1
      ? "grid-cols-1"
      : activeCardsCount === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3"
  }`;
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
          href="/beauty/dashboard/create"
          pressable
        >
          <PlusIcon weight="bold" size={20} />
          <span className="hidden sm:block">Add Product</span>
        </CardBox>
      </header>
      {/* Calculate how many cards will be active */}
      {!loadingAlerts && totalAlerts > 0 && (
        <ProductAlerts
          loadingAlerts={loadingAlerts}
          totalAlerts={totalAlerts}
          alertGridClass={alertGridClass}
          expiredUnits={expiredUnits}
          expiringSoon={expiringSoon}
          paoWarning={paoWarning}
        />
      )}
      <CardBox className="p-4 md:p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1 block md:hidden">
            <FormInput
              label=""
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="Type to search..."
            />
          </div>

          {/* Search Input untuk Desktop (Label "Search") */}
          <div className="flex-1 hidden md:block">
            <FormInput
              label="Search"
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="Type to search..."
            />
          </div>

          <div className="hidden md:block w-full md:w-56 shrink-0">
            <FormInput
              label="Category"
              options={parentCategories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              dropdownType="select"
              value={filters.categoryId}
              onChange={(val) => handleFilterChange("categoryId", val)}
              placeholder="Select category"
              disabled={loadingCategories}
            />
          </div>

          <div className="flex gap-2">
            <CardBox
              className="relative px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none"
              rounded="xl"
              color={showFilters ? "accent" : "base-300"}
              onClick={() => setShowFilters((prev) => !prev)}
              pressable
            >
              <FunnelIcon weight="bold" size={18} />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-error-content text-[10px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </CardBox>

            <CardBox
              className="px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none"
              rounded="xl"
              color="base-300"
              onClick={() => resetFilters()}
              pressable
            >
              <ArrowClockwiseIcon weight="bold" size={18} />
              <span>Reset</span>
            </CardBox>
          </div>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showFilters
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className={showFilters ? "overflow-visible" : "overflow-hidden"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-base-200">
              <div className="md:hidden">
                <FormInput
                  label="Category"
                  options={dataCategories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  dropdownType="select"
                  value={filters.categoryId}
                  onChange={(val) => handleFilterChange("categoryId", val)}
                  placeholder="Select category"
                  disabled={loadingCategories}
                />
              </div>

              <FormInput
                label="Status"
                value={filters.status}
                onChange={(val) => handleFilterChange("status", val)}
                options={statusOptions}
                dropdownType="select"
                placeholder="All"
                searchable={false}
              />
              <FormInput
                label="Brand"
                options={dataBrand.map((brand) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
                dropdownType="select"
                value={filters.brandId}
                onChange={(val) => handleFilterChange("brandId", val)}
                placeholder="Select brand"
                disabled={loadingBrand}
              />

              <FormInput
                label="Concern"
                options={dataConcern.map((concern) => ({
                  label: concern.name,
                  value: concern.id,
                }))}
                dropdownType="select"
                value={filters.concernId}
                onChange={(val) => handleFilterChange("concernId", val)}
                placeholder="Select concern"
                disabled={loadingConcern}
              />
            </div>
          </div>
        </div>
      </CardBox>
      <section className="flex flex-col gap-4 md:gap-6">
        <DataSection
          loading={loadingProduct}
          error={errorProduct}
          data={dataProduct}
        />

        {!loadingProduct && !errorProduct && dataProduct.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataProduct.map((item: any) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
      <Pagination
        page={page}
        lastPage={lastPage ?? 1}
        total={total ?? 0}
        perPage={perPage ?? 10}
        onPageChange={setPage}
      />
    </div>
  );
}
