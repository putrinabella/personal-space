"use client";

import CardBox from "@/components/CardBox";
import Pagination from "@/components/Pagination";
import { useFoodsList } from "@/features/food/foods/hooks/useFoodList";
import {
  ForkKnifeIcon,
  GearSixIcon,
  MapPinAreaIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function FoodView() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
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
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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

      <div>
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            Loading culinary archive...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodData?.map((food) => (
                <CardBox
                  key={food.id}
                  className="p-6 flex flex-col gap-4"
                  rounded="2xl"
                  color="base-100"
                  pressable
                >
                  {/* Header: Food Name & Category */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black uppercase text-slate-800">
                        {food.foodName}
                      </h3>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">
                        {food.restaurant?.name || "Unknown Place"}
                      </p>
                    </div>
                    {/* Badge Kategori */}
                    <div className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded-lg text-slate-600">
                      {food.category?.name || "General"}
                    </div>
                  </div>

                  {/* Metadata: Cuisine & Flags */}
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {food.cuisine?.name}
                    </span>
                    {food.isFavoriteFood && (
                      <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-1 rounded">
                        Favorite
                      </span>
                    )}
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
      </div>
    </div>
  );
}
