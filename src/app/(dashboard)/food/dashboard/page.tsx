"use client";

import { useCategoriesAll } from "@/features/food/categories/hooks/useCategoriesAll";
import { FoodCard } from "@/features/food/components/FoodCard";
import { FoodDetailModal } from "@/features/food/components/FoodDetailModal";
import { FoodRandomModal } from "@/features/food/components/FoodRandomModal";
import { useCuisinesAll } from "@/features/food/cuisines/hooks/useCuisinesAll";
import { useDiscoverFoodsList } from "@/features/food/dashboard/hooks/useDiscoverList";
import { useRandomFood } from "@/features/food/dashboard/hooks/useRandomFood";
import { useDiningTypeAll } from "@/features/food/diningType/hooks/useDiningTypeAll";
import { useRestaurantAll } from "@/features/food/restaurants/hooks/useRestaurantAll";
import CardBox from "@/shared/components/CardBox";
import FormInput from "@/shared/components/FormInput";
import { getIcon } from "@/shared/components/GetIcon";
import Pagination from "@/shared/components/Pagination";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import { formatDateIndo } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  ArrowClockwiseIcon,
  ArrowUpRight,
  CaretDownIcon,
  ChatText,
  DiceFiveIcon,
  DiceFourIcon,
  ForkKnife,
  ForkKnifeIcon,
  FunnelIcon,
  Heart,
  MapPinAreaIcon,
  Moon,
  Plus,
  SparkleIcon,
  Star,
  X,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function FoodView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    restaurantId: "",
    categoryId: "",
    cuisineId: "",
    diningTypeId: "",
    search: "",
    isFavorite: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
  });

  const {
    data: foodData,
    loading,
    lastPage,
    total,
    perPage,
  } = useDiscoverFoodsList(page, activeFilters);

  const { data: dataRestaurant, isLoading: loadingRestaurant } =
    useRestaurantAll();
  const { data: dataCategories, isLoading: loadingCategories } =
    useCategoriesAll();
  const { data: dataCuisines, isLoading: loadingCuisines } = useCuisinesAll();
  const { data: dataDiningType, isLoading: loadingDiningType } =
    useDiningTypeAll();
  const statusOptions = [
    { label: "All Food", value: "" },
    { label: "Favorites", value: "true" },
    { label: "Non-Favorites", value: "false" },
  ];

  const selectedFood = foodData?.find((f) => f.id === expandedId);
  const [showFilters, setShowFilters] = useState(false);
  const [showRandomModal, setShowRandomModal] = useState(false);

  // Panggil hook-nya
  const {
    data: randomFood,
    refetch: fetchRandom,
    isFetching: loadingRandom,
  } = useRandomFood(showRandomModal);

  const handleRoll = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Cegah jika ada aksi lain
    fetchRandom(); // Panggil refetch saja
  };

  const activeFilterCount = [
    filters.restaurantId,
    filters.isFavorite,
    filters.categoryId,
    filters.cuisineId,
    filters.diningTypeId,
  ].filter(Boolean).length;
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content mb-2 block">
            Eounia / Food Diary
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#2D2A2A]">
            Culinary Archive
          </h1>
          <p className="text-base-content mt-2 text-data-body md:text-base font-medium italic">
            "Curating flavors, documenting the soul of every bite."
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tambahkan tombol ini */}
          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-data-body md:text-base font-bold"
            rounded="xl"
            color="secondary" // Sesuaikan warna
            onClick={() => setShowRandomModal(true)}
            pressable
          >
            <SparkleIcon weight="bold" size={18} />
            <span>Surprise Me</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-data-body md:text-base font-bold"
            rounded="xl"
            color="accent"
            href="/food/dashboard/create"
            pressable
          >
            <ForkKnifeIcon weight="bold" size={18} />
            <span>New Entry</span>
          </CardBox>
        </div>
      </header>

      <CardBox className="p-4 md:p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <FormInput
              label="Search"
              value={searchTitle}
              onChange={handleSearchChange}
              placeholder="Type name or address..."
            />
          </div>

          <div className="hidden md:block w-full md:w-56 shrink-0">
            <FormInput
              label="Restaurant"
              options={dataRestaurant.map((r) => ({
                label: r.name,
                value: r.id,
              }))}
              dropdownType="select"
              value={filters.restaurantId}
              onChange={(val) => handleFilterChange("restaurantId", val)}
              placeholder="Select restaurant"
              disabled={loadingRestaurant}
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
              onClick={resetFilters}
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
                  label="Restaurant"
                  options={dataRestaurant.map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                  dropdownType="select"
                  value={filters.restaurantId}
                  onChange={(val) => handleFilterChange("restaurantId", val)}
                  placeholder="Select restaurant"
                  disabled={loadingRestaurant}
                />
              </div>

              <FormInput
                label="Status"
                value={filters.isFavorite}
                onChange={(val) => handleFilterChange("isFavorite", val)}
                options={statusOptions}
                dropdownType="select"
                placeholder="All"
                searchable={false}
              />
              <FormInput
                label="Categories"
                options={dataCategories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                dropdownType="select"
                value={filters.categoryId}
                onChange={(val) => handleFilterChange("categoryId", val)}
                placeholder="Select category"
                disabled={loadingCategories}
              />
              <FormInput
                label="Cuisine"
                options={dataCuisines.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                dropdownType="select"
                value={filters.cuisineId}
                onChange={(val) => handleFilterChange("cuisineId", val)}
                placeholder="Select cuisine"
                disabled={loadingCuisines}
              />
              <FormInput
                label="Dining Type"
                options={dataDiningType.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
                dropdownType="select"
                value={filters.diningTypeId}
                onChange={(val) => handleFilterChange("diningTypeId", val)}
                placeholder="Select dining type"
                disabled={loadingDiningType}
              />
            </div>
          </div>
        </div>
      </CardBox>
      <div>
        {loading ? (
          <div className="p-12 text-center text-base-content">
            Loading culinary archive...
          </div>
        ) : !foodData || foodData.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-base-300 rounded-2xl">
            <ForkKnifeIcon size={28} className="text-base-content" />
            <p className="font-bold text-base-content">
              Belum ada catatan kuliner
            </p>
            <p className="text-data-body text-base-content">
              Coba ubah filter, atau tambahkan entri baru lewat tombol "New
              Entry".
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodData.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onDetailClick={(f) => setExpandedId(f.id)}
                />
              ))}
            </div>

            <Pagination
              page={page}
              lastPage={lastPage ?? 1}
              total={total ?? 0}
              perPage={perPage ?? 10}
              onPageChange={setPage}
            />
          </div>
        )}

        {expandedId && selectedFood && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setExpandedId(null)}
          >
            <FoodDetailModal
              isOpen={!!expandedId}
              food={selectedFood}
              onClose={() => setExpandedId(null)}
            />
          </div>
        )}
      </div>
      {showRandomModal && (
        <FoodRandomModal
          show={showRandomModal}
          onClose={() => setShowRandomModal(false)}
          onRoll={handleRoll}
          food={randomFood}
          loading={loadingRandom}
        />
      )}
    </div>
  );
}
