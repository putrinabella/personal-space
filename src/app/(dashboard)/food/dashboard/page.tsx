"use client";

import CardBox from "@/components/CardBox";
import FormInput from "@/components/FormInput";
import { getIcon } from "@/components/GetIcon";
import Pagination from "@/components/Pagination";
import { useCategoriesAll } from "@/features/food/categories/hooks/useCategoriesAll";
import { useCuisinesAll } from "@/features/food/cuisines/hooks/useCuisinesAll";
import { useDiscoverFoodsList } from "@/features/food/dashboard/hooks/useDiscoverList";
import { useDiningTypeAll } from "@/features/food/diningType/hooks/useDiningTypeAll";
import { useRestaurantAll } from "@/features/food/restaurants/hooks/useRestaurantAll";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import { formatDateIndo } from "@/utils/dateFormatter";
import {
  ArrowClockwiseIcon,
  ArrowUpRight,
  ChatText,
  ForkKnifeIcon,
  Heart,
  MapPinAreaIcon,
  Moon,
  Plus,
  Star,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

function formatRupiah(value: number | string | undefined) {
  return Number(value || 0)
    .toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
    .replace("IDR", "Rp");
}

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

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
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

      {/* Filters */}
      <CardBox className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end p-6">
        <div className="md:col-span-3">
          <FormInput
            label="Search Name"
            value={searchTitle}
            onChange={handleSearchChange}
            placeholder="Type name or address..."
          />
        </div>
        <FormInput
          label="Restaurant"
          options={dataRestaurant.map((r) => ({ label: r.name, value: r.id }))}
          dropdownType="select"
          value={filters.restaurantId}
          onChange={(val) => {
            handleFilterChange("restaurantId", val);
          }}
          placeholder="Select restaurant"
          disabled={loadingRestaurant}
        />

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
          required
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
          required
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
          required
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
        <div className="hidden md:flex md:col-span-2 gap-2">
          <CardBox
            className="px-4 py-2 flex items-center justify-center gap-2 text-base font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={resetFilters}
            pressable
          >
            <ArrowClockwiseIcon weight="bold" size={18} />
            <span>Reset</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center justify-center gap-2 text-base font-bold flex-1"
            rounded="xl"
            color="accent"
            href="/food/restaurant/create"
            pressable
          >
            <Plus weight="bold" size={18} />
            <span>Add New</span>
          </CardBox>
        </div>

        <div className="md:hidden flex gap-2 w-full">
          <CardBox
            className="px-4 py-2 flex items-center justify-center gap-2 text-data-body font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={resetFilters}
            pressable
          >
            <ArrowClockwiseIcon weight="bold" size={18} />
            <span>Reset</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center justify-center gap-2 text-data-body font-bold flex-1"
            rounded="xl"
            color="accent"
            href="/food/restaurant/create"
            pressable
          >
            <Plus weight="bold" size={18} />
            <span>Add New</span>
          </CardBox>
        </div>
      </CardBox>

      {/* Grid */}
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
                <CardBox
                  key={food.id}
                  className="group p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200"
                  rounded="2xl"
                  color="base-100"
                  onClick={() => setExpandedId(food.id)}
                  pressable
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-primary/40 text-base-content/80 rounded-2xl group-hover:bg-accent group-hover:text-accent-content transition-colors duration-300">
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
                    {food.restaurant?.isFavoriteRestaurant && (
                      <div className="bg-error/40 text-error p-2 rounded-xl shrink-0">
                        <Heart weight="fill" size={16} />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-base-300" />
                  {/* Ratings */}

                  {food.latestLog && (
                    <div className="flex items-center justify-between text-data-body px-1">
                      <span className="font-bold text-base-content/60">
                        Ratings
                      </span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1.5 font-bold text-accent">
                          <Moon weight="fill" size={14} />{" "}
                          {food.latestLog.ratingHis}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-error">
                          <Star weight="fill" size={14} />{" "}
                          {food.latestLog.ratingHer}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center gap-0.5 bg-base-200 py-3 rounded-xl">
                      <span className="text-caption font-bold uppercase tracking-widest text-base-content/60">
                        Price
                      </span>
                      <span className="text-data-body font-black text-base-content">
                        {formatRupiah(food.latestLog?.price)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-0.5 bg-base-200 py-3 rounded-xl">
                      <span className="text-caption font-bold uppercase tracking-widest text-base-content/60">
                        Visits
                      </span>
                      <span className="text-data-body font-black text-base-content">
                        {food.totalLogs}x
                      </span>
                    </div>
                  </div>

                  {/* Review Teaser */}
                  {food.latestLog?.reviewText && (
                    <div className="flex items-start gap-3 bg-base-200 rounded-xl px-3 py-2.5">
                      <ChatText
                        size={14}
                        className="text-base-content/60 mt-0.5 shrink-0"
                      />
                      <div className="flex justify-between items-start flex-1 gap-4 overflow-hidden">
                        <p className="text-caption text-base-content  line-clamp-2">
                          "{food.latestLog.reviewText}"
                        </p>
                        <span className="text-caption font-bold text-base-content/40 uppercase whitespace-nowrap mt-0.5">
                          {formatDateIndo(food.latestLog.dateVisited, true)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Footer */}

                  <div className="flex items-start justify-between border-t border-base-300 pt-3 mt-2 text-left">
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
                        {/* Nama Restoran: Tebal dan ringkas */}
                        <span className="text-data-body font-bold truncate">
                          {food.restaurant?.name}
                        </span>

                        {/* Alamat: Lebih kecil, lebih pudar */}
                        <span className="text-caption text-base-content/60 truncate leading-tight">
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

        {/* Expanded history modal */}
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
                  <h2 className="text-xl font-black text-base-content">
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

              <div className="flex flex-col gap-4">
                {(() => {
                  // 1. Sort log di luar map
                  const logs = [...(selectedFood.allLogs || [])].sort(
                    (a, b) =>
                      new Date(b.dateVisited).getTime() -
                      new Date(a.dateVisited).getTime(),
                  );

                  // 2. Handle empty state
                  if (logs.length === 0) {
                    return (
                      <p className="text-data-body text-base-content text-center py-6">
                        Belum ada riwayat kunjungan tercatat.
                      </p>
                    );
                  }

                  // 3. Render tabel sekali saja untuk semua log
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-widest text-base-content/40 font-bold">
                            <th className="px-3">Tanggal</th>
                            <th className="px-2 text-center">Yoga</th>
                            <th className="px-2 text-center">Putri</th>
                            <th className="px-2 text-right">Harga</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {logs.map((log) => {
                            // Logika penentuan warna rating:
                            // Jika <= 5, beri warna error/pudar. Jika > 5, beri warna accent/error sesuai role.
                            const isHisLow = log.ratingHis <= 5;
                            const isHerLow = log.ratingHer <= 5;

                            return (
                              <tr
                                key={log.id}
                                className="bg-base-200/20 hover:bg-base-200/40 transition-colors"
                              >
                                <td className="px-3 py-3 rounded-l-2xl font-body font-medium text-base-content/80">
                                  {formatDateIndo(log.dateVisited)}
                                </td>

                                {/* Rating Yoga (His) */}
                                <td
                                  className={`px-2 py-3 text-center font-header font-bold ${isHisLow ? "text-error" : "text-base-content"}`}
                                >
                                  {log.ratingHis}
                                </td>

                                {/* Rating Putri (Her) */}
                                <td
                                  className={`px-2 py-3 text-center font-header font-bold ${isHerLow ? "text-error" : "text-base-content"}`}
                                >
                                  {log.ratingHer}
                                </td>

                                {/* Harga */}
                                <td className="px-3 py-3 rounded-r-2xl text-right font-header font-bold text-base-content/70 tabular-nums">
                                  {formatRupiah(log.price)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {/* Render Review di luar tabel agar rapi */}
                      {logs.some((l) => l.reviewText) && (
                        <div className="mt-6 space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 px-2">
                            Catatan Kunjungan
                          </p>
                          {logs
                            .filter((l) => l.reviewText)
                            .map((log) => (
                              <div
                                key={log.id}
                                className="bg-base-200/30 p-4 rounded-2xl border border-base-200/50"
                              >
                                <p className="text-[10px] font-caption text-base-content/50 mb-1.5 font-bold">
                                  {formatDateIndo(log.dateVisited)}
                                </p>
                                <p className="text-sm font-body italic text-base-content/80 leading-relaxed">
                                  “{log.reviewText}”
                                </p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </CardBox>
          </div>
        )}
      </div>
    </div>
  );
}
