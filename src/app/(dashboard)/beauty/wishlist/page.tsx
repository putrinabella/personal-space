"use client";

import WishlistCard from "@/features/beauty/components/WishlistCard";
import { useWishlistList } from "@/features/beauty/wishlist/hooks/useWishlistList";
import CardBox from "@/shared/components/CardBox";
import DataSection from "@/shared/components/DataSection";
import Pagination from "@/shared/components/Pagination";
import { useDataFilters } from "@/shared/hooks/use-data-filters";
import { PlusIcon } from "@phosphor-icons/react";

export default function SkincareDashboardPage() {
  const { page, setPage, activeFilters } = useDataFilters({
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
    data: dataWishlist,
    loading: loadingWishlist,
    error: errorWishlist,
    lastPage,
    total,
    perPage,
  } = useWishlistList(page, activeFilters);

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <header className="flex items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Inventory
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            W i s h l i s t
          </h1>
        </div>
        <CardBox
          className="px-3 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0"
          rounded="xl"
          color="accent"
          href="/beauty/wishlist/create"
          pressable
        >
          <PlusIcon weight="bold" size={20} />
          <span className="hidden sm:block">Add Wish</span>
        </CardBox>
      </header>
      <section className="flex flex-col gap-4 md:gap-6">
        <DataSection
          loading={loadingWishlist}
          error={errorWishlist}
          data={dataWishlist}
        />

        {!loadingWishlist && !errorWishlist && dataWishlist.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataWishlist.map((item: any) => (
              <WishlistCard key={item.id} item={item} />
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
