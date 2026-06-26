// "use client";

// import { useState } from "react";
// import CardBox from "@/components/CardBox";
// import Pagination from "@/components/Pagination";
// import { MapPin, Star } from "lucide-react";
// import { useRestaurantsList } from "@/features/food/restaurants/hooks/useRestaurantsList";
// import CardHeader from "@/components/CardHeader";
// import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";
// import {
//   ArrowClockwiseIcon,
//   ArrowUpRight,
//   Pencil,
//   Plus,
//   Trash,
// } from "@phosphor-icons/react";
// import ActionButton from "@/components/ActionButton";
// import { useDataFilters } from "@/shared/hooks/use-data-filters";
// import FormInput from "@/components/FormInput";

// export default function RestaurantPage() {
//   const {
//     page,
//     setPage,
//     searchTitle,
//     filters, // Ini mungkin belum berisi 'search' jika tidak diset lewat handleFilterChange
//     activeFilters,
//     handleSearchChange,
//     handleFilterChange, // Tambahkan ini untuk filter favorit
//     resetFilters,
//   } = useDataFilters({
//     search: "",
//     isFavoriteRestaurant: "",
//   });

//   const {
//     data: restaurants,

//     loading,
//     lastPage,
//     total,
//     perPage,
//   } = useRestaurantsList(page, activeFilters);

//   const isFilterActive =
//     searchTitle !== "" || filters.isFavoriteRestaurant !== "";
//   const statusOptions = [
//     { label: "All Restaurant", value: "" },
//     { label: "Favorites Only", value: "true" },
//     { label: "Non-Favorites", value: "false" },
//   ];

//   return (
//     <div className="flex flex-col gap-8">
//       <CardHeader
//         title="R E S T A U R A N T S"
//         icon={MapPinAreaIcon}
//         color="secondary"
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-sm items-end">
//         <div className="lg:col-span-2">
//           <FormInput
//             label="Search Name or Address"
//             value={searchTitle}
//             onChange={handleSearchChange}
//             placeholder="Type name or address"
//           />
//         </div>
//         <div className="lg:col-span-2">
//           <FormInput
//             label="Status"
//             value={filters.isFavoriteRestaurant}
//             onChange={(val) => handleFilterChange("isFavoriteRestaurant", val)}
//             options={statusOptions}
//             dropdownType="select"
//             placeholder="Semua Status"
//             className="w-full"
//             searchable={false}
//           />
//         </div>
// <CardBox
//   className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
//   rounded="xl"
//   color="base-300"
//   onClick={resetFilters}
//   pressable
// >
//   <ArrowClockwiseIcon weight="bold" size={18} />
//   <span>Reset</span>
// </CardBox>
// <CardBox
//   className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
//   rounded="xl"
//   color="accent"
//   href="/food/restaurant/create"
//   pressable
// >
//   <Plus weight="bold" size={18} />
//   <span>Add New Place</span>
// </CardBox>
//       </div>
//       {loading ? (
//         <div className="p-8 text-center">Loading your culinary spots...</div>
//       ) : (
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {restaurants?.map((res) => (
//               <CardBox
//                 key={res.id}
//                 className="p-6 flex flex-col gap-4 group"
//                 rounded="2xl"
//                 color="base-100"
//                 pressable
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="heading-h3 font-bold">{res.name}</h3>
//                     <p className="text-body  mt-1 flex items-center gap-1">
//                       {res.address}
//                     </p>
//                   </div>
//                   {res.isFavoriteRestaurant && (
//                     <Star size={20} className="text-accent fill-accent" />
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-base-200">
//                   <a
//                     href={res.googleMapsUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest  hover:text-primary/70 transition-colors"
//                   >
//                     <span>Open in Maps</span>
//                     <ArrowUpRight size={14} />
//                   </a>

//                   <div className="flex flex-row gap-2">
//                     <ActionButton
//                       icon={Pencil}
//                       color="warning"
//                       size={16}
//                       tooltip="Edit"
//                       className="w-full"
//                     />
//                     <ActionButton
//                       icon={Trash}
//                       color="error"
//                       size={16}
//                       tooltip="Delete"
//                       className="w-full"
//                     />
//                   </div>
//                 </div>
//               </CardBox>
//             ))}
//           </div>

//           {/* Komponen Pagination */}
//           <Pagination
//             page={page}
//             lastPage={lastPage ?? 1}
//             total={total ?? 0}
//             perPage={perPage ?? 10}
//             onPageChange={(newPage) => setPage(newPage)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import CardBox from "@/components/CardBox";
import Pagination from "@/components/Pagination";
import { Star } from "lucide-react";
import { useRestaurantsList } from "@/features/food/restaurants/hooks/useRestaurantsList";
import CardHeader from "@/components/CardHeader";
import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";
import {
  ArrowClockwiseIcon,
  ArrowUpRight,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import ActionButton from "@/components/ActionButton";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import FormInput from "@/components/FormInput";

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

  const statusOptions = [
    { label: "All Restaurants", value: "" },
    { label: "Favorites", value: "true" },
    { label: "Non-Favorites", value: "false" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 md:px-0">
      <CardHeader
        title="R E S T A U R A N T S"
        icon={MapPinAreaIcon}
        color="secondary"
      />

      <CardBox className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end p-6">
        {/* Search Bar - Mengambil porsi besar di desktop */}
        <div className="md:col-span-3">
          <FormInput
            label="Search Name or Address"
            value={searchTitle}
            onChange={handleSearchChange}
            placeholder="Type name or address..."
          />
        </div>
        {/* Status Dropdown */}
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
            {restaurants?.map((res) => (
              <CardBox
                key={res.id}
                className="p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow border border-base-200"
                rounded="2xl"
                color="base-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h3 className="heading-h3 font-bold leading-tight">
                      {res.name}
                    </h3>
                    <p className="text-body opacity-70 mt-1 font-bold">
                      {res.address}
                    </p>
                  </div>
                  {res.isFavoriteRestaurant && (
                    <Star
                      size={18}
                      className="text-accent fill-accent shrink-0"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-base-200 mt-auto">
                  <a
                    href={res.googleMapsUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-caption font-black uppercase tracking-widest hover:underline"
                  >
                    Open in Maps <ArrowUpRight size={12} />
                  </a>
                  <div className="flex gap-1">
                    <ActionButton icon={Pencil} color="warning" size={14} />
                    <ActionButton icon={Trash} color="error" size={14} />
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
