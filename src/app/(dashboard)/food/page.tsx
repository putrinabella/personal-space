"use client";

import CardBox from "@/components/CardBox";
import FormInput from "@/components/FormInput";
import Pagination from "@/components/Pagination";
import { useFoodsList } from "@/features/food/foods/hooks/useFoodList";
import {
  ArrowClockwiseIcon,
  CalendarDots,
  CaretDown,
  CaretUp,
  ChatText,
  CurrencyCircleDollar,
  ForkKnifeIcon,
  GearSixIcon,
  MapPinAreaIcon,
  Plus,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function FoodView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const {
    data: foodData,
    loading,
    error,
    total,
    lastPage,
    perPage,
  } = useFoodsList(page);
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          {/* Breadcrumb sederhana untuk navigasi Eounia */}
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
          <CardBox
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
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="accent"
            // onClick={() => setIsInputModalOpen(true)}
            href="/food/create"
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
            // value={searchTitle}
            // onChange={handleSearchChange}
            placeholder="Type name or address..."
          />
        </div>

        <div className="md:col-span-1">
          <FormInput
            label="Status"
            // value={filters.isFavoriteRestaurant}
            // onChange={(val) => handleFilterChange("isFavoriteRestaurant", val)}
            // options={statusOptions}
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
            // onClick={resetFilters}
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
            // onClick={resetFilters}
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
                // Sort logs: Terbaru (dateVisited) di atas
                const sortedLogs = [...(food.logs || [])].sort(
                  (a, b) =>
                    new Date(b.dateVisited).getTime() -
                    new Date(a.dateVisited).getTime(),
                );
                const latestLog = sortedLogs[0];
                const isExpanded = expandedId === food.id;

                return (
                  <CardBox
                    key={food.id}
                    className="p-6 flex flex-col gap-4 border-l-4 border-l-accent"
                    rounded="2xl"
                    color="base-100"
                    onClick={() => setExpandedId(food.id)} // Buka modal
                    pressable
                  >
                    {/* Header: Nama Makanan & Resto */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-black uppercase text-slate-800">
                          {food.foodName}
                        </h3>
                        <p className="text-sm font-bold text-slate-500 flex items-center gap-1">
                          <MapPinAreaIcon size={14} /> {food.restaurant?.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-md uppercase">
                          {food.category?.name}
                        </span>
                        <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-md uppercase">
                          {food.cuisine?.name}
                        </span>
                      </div>
                    </div>

                    {/* Info Bar: Harga, Rating, Tanggal (dari Log Terbaru) */}
                    {latestLog && (
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Last Price
                          </span>
                          <span className="text-sm font-black text-slate-800">
                            Rp {Number(latestLog.price).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col items-center border-x border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Rating
                          </span>
                          <span className="text-sm font-black text-accent">
                            {latestLog.ratingHis} / {latestLog.ratingHer}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Visited
                          </span>
                          <span className="text-sm font-black text-slate-800">
                            {latestLog.dateVisited}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tags & Favorites */}
                    <div className="flex flex-wrap gap-2">
                      {food.isFavoriteFood && (
                        <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-1 rounded-lg">
                          ❤ Food
                        </span>
                      )}
                      {food.isFavoriteDrink && (
                        <span className="text-[10px] font-black text-blue-500 uppercase bg-blue-50 px-2 py-1 rounded-lg">
                          ☕ Drink
                        </span>
                      )}
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
                {foodData
                  ?.find((f) => f.id === expandedId)
                  ?.logs.map((log) => (
                    <div key={log.id} className="border-b pb-4">
                      <p className="font-bold">{log.dateVisited}</p>
                      <p className="text-sm">{log.reviewText}</p>
                    </div>
                  ))}
              </div>
            </CardBox>
          </div>
        )}
      </div>
    </div>
  );
}
