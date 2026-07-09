"use client";

import { useCategoriesAll } from "@/features/food/categories/hooks/useCategoriesAll";
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
              {foodData.map((food) => {
                const isHisLow = food.latestLog.ratingHis <= 5;
                const isHerLow = food.latestLog.ratingHer <= 5;
                return (
                  <CardBox
                    key={food.id}
                    className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden"
                    rounded="2xl"
                    color="base-100"
                    onClick={() => setExpandedId(food.id)}
                    pressable
                  >
                    {food.restaurant?.isFavoriteRestaurant && (
                      <div className="absolute top-0 right-4 bg-error text-error-content px-2 py-1 rounded-b-lg shadow-sm z-10">
                        <Heart weight="fill" size={14} />
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-primary/40 text-base-content rounded-2xl group-hover:bg-accent group-hover:text-accent-content transition-colors duration-300">
                        {getIcon(food.category?.iconSlug || "BowlSteam")}
                      </div>
                      <div className="flex flex-col items-start justify-start flex-1 min-w-0 text-left">
                        <h3 className="font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
                          {food.foodName}
                        </h3>
                        <p className="text-caption font-semibold uppercase tracking-wide text-base-content truncate w-full">
                          {food.category?.name} • {food.cuisine?.name}
                        </p>
                      </div>
                    </div>

                    {food.latestLog && (
                      <div className="relative -mx-5">
                        <div className="border-t-2 border-dashed border-base-300" />
                        <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
                        <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
                      </div>
                    )}

                    {food.latestLog && (
                      <div className="flex items-center justify-center gap-6 py-1">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-11 h-11 rounded-full border-2 border-accent flex items-center justify-center ${isHisLow ? "border-error" : "border-accent"}`}
                          >
                            <span
                              className={`font-black text-accent ${isHisLow ? "text-error" : "text-data-body "}`}
                            >
                              {food.latestLog.ratingHis}
                            </span>
                          </div>

                          <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                            Yoga
                          </span>
                        </div>

                        <div className="w-px h-8 bg-base-300" />

                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-11 h-11 rounded-full border-2 border-accent flex items-center justify-center ${isHerLow ? "border-error" : "border-accent"}`}
                          >
                            <span
                              className={`font-black text-accent ${isHerLow ? "text-error" : "text-data-body "}`}
                            >
                              {food.latestLog.ratingHer}
                            </span>
                          </div>
                          <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                            Putri
                          </span>
                        </div>

                        {food.diningType && (
                          <>
                            <div className="w-px h-8 bg-base-300" />
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-11 h-11 rounded-full bg-base-200 flex items-center justify-center text-base-content">
                                {getIcon(
                                  food.diningType.iconSlug || "ForkKnife",
                                )}
                              </div>
                              <span className="text-caption font-bold uppercase tracking-widest text-base-content truncate max-w-15">
                                {food.diningType.name}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex items-stretch bg-base-200 rounded-xl overflow-hidden text-caption">
                      <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3">
                        <span className="font-bold uppercase tracking-widest text-base-content">
                          Harga
                        </span>
                        <span className="text-data-body font-black text-base-content">
                          {formatRupiah(food.latestLog?.price)}
                        </span>
                      </div>
                      <div className="w-px bg-base-300" />
                      <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3">
                        <span className=" font-bold uppercase tracking-widest text-base-content">
                          Kunjungan
                        </span>
                        <span className="text-data-body font-black text-base-content">
                          {food.totalLogs}x
                        </span>
                      </div>
                    </div>

                    {food.latestLog?.reviewText && (
                      <div className="flex items-start gap-2.5 pl-3 border-l-2 border-base-300 text-caption text-base-content">
                        <p className="line-clamp-2 flex-1 text-left">
                          "{food.latestLog.reviewText}"
                        </p>
                        <span className="text-caption font-bold text-base-content uppercase whitespace-nowrap shrink-0">
                          {formatDateIndo(food.latestLog.dateVisited, true)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between border-t border-base-300 pt-3 mt-1 text-left">
                      <a
                        href={food.restaurant?.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-start gap-2 text-base-content hover:text-accent transition-colors group/link w-full overflow-hidden"
                      >
                        <div className="mt-0.5 shrink-0">
                          <MapPinAreaIcon size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-caption font-bold truncate">
                            {food.restaurant?.name}
                          </span>
                          <span className="text-caption text-base-content truncate leading-tight">
                            {food.restaurant?.address}
                          </span>
                        </div>
                        <div className="ml-auto mt-0.5 shrink-0">
                          <ArrowUpRight
                            size={14}
                            className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                          />
                        </div>
                      </a>
                    </div>
                  </CardBox>
                );
              })}
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
            <CardBox
              className="max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
              rounded="2xl"
            >
              <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                  <span className="text-caption font-bold uppercase tracking-widest text-base-content block mb-1">
                    Riwayat Kunjungan
                  </span>
                  <h2 className="heading-h3 font-black text-base-content">
                    {selectedFood.foodName}
                  </h2>
                  <p className="text-caption text-base-content mt-0.5">
                    {selectedFood.restaurant?.name}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedId(null)}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-colors"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {(() => {
                const logs = [...(selectedFood.allLogs || [])].sort(
                  (a, b) =>
                    new Date(b.dateVisited).getTime() -
                    new Date(a.dateVisited).getTime(),
                );

                if (logs.length === 0) {
                  return (
                    <div className="flex flex-col items-center gap-2 py-10 text-center">
                      <ForkKnife size={28} className="text-base-content/20" />
                      <p className="text-data-body text-base-content">
                        Belum ada riwayat kunjungan tercatat.
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="relative flex flex-col">
                    {logs.map((log, idx) => {
                      const isHisLow = log.ratingHis <= 5;
                      const isHerLow = log.ratingHer <= 5;
                      return (
                        <div key={log.id} className="relative pl-6">
                          {idx !== logs.length - 1 && (
                            <div className="absolute left-1.75 top-4 bottom-0 w-px bg-base-300" />
                          )}
                          <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-base-200 border-2 border-primary" />

                          <div className="pb-5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-caption font-bold text-base-content">
                                {formatDateIndo(log.dateVisited)}
                              </span>
                              <span className="text-data-body font-black text-base-content tabular-nums">
                                {formatRupiah(log.price)}
                              </span>
                            </div>

                            <div className="bg-base-200/50 rounded-2xl px-4 py-3 flex flex-col gap-3">
                              <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isHisLow ? "border-error" : "border-accent"}`}
                                  >
                                    <span
                                      className={`text-xs font-black ${isHisLow ? "text-error" : "text-data-body"}`}
                                    >
                                      {log.ratingHis}
                                    </span>
                                  </div>
                                  <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                                    Yoga
                                  </span>
                                </div>

                                <div className="w-px h-6 bg-base-300" />

                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isHerLow ? "border-error" : "border-accent"}`}
                                  >
                                    <span
                                      className={`text-xs font-black ${isHerLow ? "text-error" : "text-data-body"}`}
                                    >
                                      {log.ratingHer}
                                    </span>
                                  </div>
                                  <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                                    Putri
                                  </span>
                                </div>
                              </div>

                              {log.reviewText && (
                                <p className="text-caption text-base-content leading-relaxed border-t border-base-300/70 pt-2.5">
                                  "{log.reviewText}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </CardBox>
          </div>
        )}
      </div>
      {showRandomModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowRandomModal(false)}
        >
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-black mb-4 text-center text-base-content">
              Random Pick!
            </h3>

            {loadingRandom ? (
              <CardBox className="p-12 text-center text-base-content">
                Finding a delicious choice...
              </CardBox>
            ) : randomFood && randomFood.length > 0 ? (
              (() => {
                const food = randomFood[0]; // Ambil data pertama saja
                const isHisLow = food.latestLog.ratingHis <= 5;
                const isHerLow = food.latestLog.ratingHer <= 5;

                return (
                  <CardBox
                    className="p-5 flex flex-col gap-4 border border-base-200 overflow-hidden"
                    rounded="2xl"
                    color="base-100"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-primary/40 text-base-content rounded-2xl">
                        {getIcon(food.category?.iconSlug || "BowlSteam")}
                      </div>
                      <div className="flex flex-col items-start justify-start flex-1 min-w-0 text-left">
                        <h3 className="font-extrabold tracking-tight text-base-content truncate w-full">
                          {food.foodName}
                        </h3>
                        <p className="text-caption font-semibold uppercase tracking-wide text-base-content truncate w-full">
                          {food.category?.name} • {food.cuisine?.name}
                        </p>
                      </div>
                    </div>

                    {/* Rating Section */}
                    {food.latestLog && (
                      <div className="flex items-center justify-center gap-6 py-1 border-y border-dashed border-base-300">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center ${isHisLow ? "border-error" : "border-accent"}`}
                          >
                            <span
                              className={`font-black ${isHisLow ? "text-error" : "text-accent"}`}
                            >
                              {food.latestLog.ratingHis}
                            </span>
                          </div>
                          <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                            Yoga
                          </span>
                        </div>
                        <div className="w-px h-8 bg-base-300" />
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center ${isHerLow ? "border-error" : "border-accent"}`}
                          >
                            <span
                              className={`font-black ${isHerLow ? "text-error" : "text-accent"}`}
                            >
                              {food.latestLog.ratingHer}
                            </span>
                          </div>
                          <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                            Putri
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-2">
                      <CardBox
                        className="px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none"
                        rounded="xl"
                        color="base-300"
                        onClick={fetchRandom}
                        // disabled={loadingRandom}
                        pressable
                      >
                        <DiceFourIcon weight="bold" size={18} />
                        <span>Roll Again</span>
                      </CardBox>
                      <CardBox
                        className="px-4 h-11 flex items-center justify-center gap-2 text-sm font-bold flex-1 md:flex-none"
                        rounded="xl"
                        color="base-300"
                        onClick={() => setShowRandomModal(false)}
                        pressable
                      >
                        <XIcon weight="bold" size={18} />
                        <span>Close</span>
                      </CardBox>
                    </div>
                  </CardBox>
                );
              })()
            ) : (
              <CardBox className="p-8 text-center">No food found.</CardBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
