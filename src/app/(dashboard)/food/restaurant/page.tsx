"use client";

import CardBox from "@/shared/components/CardBox";
import Pagination from "@/shared/components/Pagination";
import { Star } from "lucide-react";
import { useRestaurantsList } from "@/features/food/restaurants/hooks/useRestaurantsList";
import CardHeader from "@/shared/components/CardHeader";
import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";
import {
  ArrowClockwiseIcon,
  ArrowUpRight,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import ActionButton from "@/shared/components/ActionButton";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import FormInput from "@/shared/components/FormInput";
import { useRestaurantsDelete } from "@/features/food/restaurants/hooks/useRestaurantDelete";

export default function RestaurantPage() {
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
    search: "",
    isFavoriteRestaurant: "",
  });

  const {
    data: restaurants,
    loading,
    lastPage,
    total,
    perPage,
  } = useRestaurantsList(page, activeFilters);

  const { handleDelete } = useRestaurantsDelete();
  const statusOptions = [
    { label: "All Restaurants", value: "" },
    { label: "Favorites", value: "true" },
    { label: "Non-Favorites", value: "false" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto ">
      <CardHeader
        title="R E S T A U R A N T S"
        icon={MapPinAreaIcon}
        color="secondary"
      />

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
            value={filters.isFavoriteRestaurant}
            onChange={(val) => handleFilterChange("isFavoriteRestaurant", val)}
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

      {loading ? (
        <div className="p-12 text-center text-base-500">
          Loading culinary spots...
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants?.map((data) => (
              <CardBox
                key={data.id}
                className="p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow border border-base-200"
                rounded="2xl"
                color="base-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h3 className="heading-h3 font-bold leading-tight">
                      {data.name}
                    </h3>
                    <p className="text-body opacity-70 mt-1 font-bold">
                      {data.address}
                    </p>
                  </div>
                  {data.isFavoriteRestaurant && (
                    <Star
                      size={18}
                      className="text-accent fill-accent shrink-0"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-base-200 mt-auto">
                  <a
                    href={data.googleMapsUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-caption font-black uppercase tracking-widest hover:underline"
                  >
                    Open in Maps <ArrowUpRight size={12} />
                  </a>
                  <div className="flex gap-1">
                    <ActionButton
                      icon={Pencil}
                      color="warning"
                      size={14}
                      to={`/food/restaurant/${data.id}/edit`}
                    />
                    <ActionButton
                      icon={Trash}
                      color="error"
                      size={14}
                      onClick={() => handleDelete(data.id)}
                    />
                  </div>
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
  );
}
