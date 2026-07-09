"use client";

import CardBox from "@/shared/components/CardBox";
import FormInput from "@/shared/components/FormInput";
import { getIcon } from "@/shared/components/GetIcon";
import Pagination from "@/shared/components/Pagination";
import { useDiscoverFoodsList } from "@/features/food/dashboard/hooks/useDiscoverList";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import {
  ArrowClockwiseIcon,
  ArrowUpRight,
  CalendarDots,
  CaretDown,
  CaretUp,
  ChatText,
  Coffee,
  CurrencyCircleDollar,
  ForkKnifeIcon,
  GearSixIcon,
  Heart,
  MapPinAreaIcon,
  Plus,
  Star,
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
    keyword: "",
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
  const statusOptions = [
    { label: "All Food", value: "" },
    { label: "Favorites", value: "true" },
    { label: "Non-Favorites", value: "false" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-2 block">
            Eounia / Food Diary
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#2D2A2A]">
            Culinary Archive
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium italic">
            "Curating flavors, documenting the soul of every bite."
          </p>
        </div>

        {/* Tombol dengan layout responsif */}
        <div className="flex flex-wrap items-center gap-3">
          {/* <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="base-300"
            href="/food/settings"
            pressable
          >
            <GearSixIcon weight="bold" size={18} />
            <span>Config</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="secondary"
            href="/food/restaurant"
            pressable
          >
            <MapPinAreaIcon weight="bold" size={18} />
            <span>Places</span>
          </CardBox> */}

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
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

      <CardBox className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end p-6">
        <div className="md:col-span-3">
          <FormInput
            label="Search Name or Address"
            value={searchTitle}
            onChange={handleSearchChange}
            placeholder="Type name or address..."
          />
        </div>

        <div className="md:col-span-1">
          <FormInput
            label="Status"
            value={filters.isFavorite}
            onChange={(val) => handleFilterChange("isFavorite", val)}
            options={statusOptions}
            dropdownType="select"
            placeholder="All"
            searchable={false}
          />
        </div>
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
            className="px-4 py-2 flex items-center justify-center gap-2 text-sm font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={resetFilters}
            pressable
          >
            <ArrowClockwiseIcon weight="bold" size={18} />
            <span>Reset</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center justify-center gap-2 text-sm font-bold flex-1"
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

      <div>
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            Loading culinary archive...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodData?.map((food) => {
                // Sekarang gunakan food.allLogs yang datang dari database
                const logs = food.allLogs || [];
                // Sort manual di frontend agar selalu terbaru
                const sortedLogs = [...logs].sort(
                  (a, b) =>
                    new Date(b.dateVisited).getTime() -
                    new Date(a.dateVisited).getTime(),
                );
                const latestLog = sortedLogs[0];
                return (
                  <CardBox
                    key={food.id}
                    className="p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow border border-base-200"
                    rounded="2xl"
                    color="base-100"
                    onClick={() => setExpandedId(food.id)}
                    pressable
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Ikon dalam kotak sempurna */}
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-primary text-primary-content rounded-2xl group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                          {getIcon(food.category?.iconSlug || "BowlSteam")}
                        </div>

                        {/* Teks Rata Kiri */}
                        <div className="flex flex-col items-start justify-start flex-1 min-w-0 text-left">
                          <h3 className="heading-h3 font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
                            {food.foodName}
                          </h3>
                          <p className="text-body mt-0.5 w-full">
                            {food.category?.name} • {food.cuisine?.name}
                          </p>
                        </div>
                      </div>

                      {/* Restaurant Favorite Status */}
                      {food.restaurant?.isFavoriteRestaurant && (
                        <div className="bg-amber-50 text-amber-600 p-2 rounded-xl shrink-0">
                          <Star weight="fill" size={16} />
                        </div>
                      )}
                    </div>
                    {/* Info Bar (Modern Stats) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col items-center justify-center bg-accent/20 py-3 rounded-xl border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Harga
                        </span>
                        <span className="text-sm font-black text-slate-800 mt-0.5">
                          {Number(latestLog?.price || 0)
                            .toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            })
                            .replace("IDR", "Rp")}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center bg-accent/20 py-3 rounded-xl border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Kunjungan
                        </span>
                        <span className="text-sm font-black text-slate-800 mt-0.5">
                          {food.totalLogs}x
                        </span>
                      </div>
                    </div>

                    {/* Rating Row - dipisah biar jelas ini dua orang, bukan pecahan */}
                    {latestLog && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1.5 flex-1 bg-rose-50 text-rose-700 px-3 py-2 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                            Aku
                          </span>
                          <span className="ml-auto text-sm font-black flex items-center gap-0.5">
                            {latestLog.ratingHis}{" "}
                            <Star weight="fill" size={12} />
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-1 bg-sky-50 text-sky-700 px-3 py-2 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                            Pasangan
                          </span>
                          <span className="ml-auto text-sm font-black flex items-center gap-0.5">
                            {latestLog.ratingHer}{" "}
                            <Star weight="fill" size={12} />
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Info Bar (Modern Stats) */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Harga",
                          value: Number(latestLog?.price || 0)
                            .toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            })
                            .replace("IDR", "Rp"),
                        },
                        {
                          label: "Rating",
                          value: latestLog
                            ? `${latestLog.ratingHis}/${latestLog.ratingHer}`
                            : "-",
                        },
                        { label: "Kunjungan", value: `${food.totalLogs}x` },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center bg-accent/20 py-3 rounded-xl border border-slate-100"
                        >
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {item.label}
                          </span>
                          <span className="text-sm font-black text-slate-800 mt-0.5">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action / Footer Section */}
                    <div className="flex items-center justify-between border-t border-base-300 pt-4 mt-1">
                      <a
                        href={food.restaurant?.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-accent transition-all group/link"
                      >
                        <MapPinAreaIcon size={16} />
                        <span className="truncate ">
                          {food.restaurant?.name}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                        />
                      </a>

                      <div className="flex gap-2">
                        {food.isFavoriteFood && (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                            <Heart weight="fill" size={12} /> Food
                          </span>
                        )}
                        {food.isFavoriteDrink && (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                            <Coffee weight="fill" size={12} /> Drink
                          </span>
                        )}
                      </div>
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
        {expandedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CardBox
              className="max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
              rounded="2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase">History Log</h2>
                <button
                  onClick={() => setExpandedId(null)}
                  className="font-bold"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {(() => {
                  const selectedFood = foodData?.find(
                    (f) => f.id === expandedId,
                  );
                  const logs = selectedFood?.allLogs || [];

                  return logs
                    .sort(
                      (a, b) =>
                        new Date(b.dateVisited).getTime() -
                        new Date(a.dateVisited).getTime(),
                    )
                    .map((log) => (
                      <div key={log.id} className="border-b pb-4">
                        <p className="font-bold text-sm text-slate-800">
                          {log.dateVisited}
                        </p>
                        <p className="text-sm text-slate-600">
                          {log.reviewText}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-xs font-bold text-accent">
                            Harga: Rp {Number(log.price).toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            Rating: {log.ratingHis}/{log.ratingHer}
                          </span>
                        </div>
                      </div>
                    ));
                })()}
              </div>
            </CardBox>
          </div>
        )}
      </div>
    </div>
  );
}
