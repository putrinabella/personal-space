"use client";

import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { ShoppingCartSimple, Check, X } from "@phosphor-icons/react";
import { useRouter, useParams } from "next/navigation";
import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";
import { useWishlistPurchase } from "@/features/beauty/wishlist/hooks/useWishlistPurchase";
import { useBrandsAll } from "@/features/beauty/waste/hooks/useWasteAll";

export default function PurchaseWishlistPage() {
  const router = useRouter();
  const params = useParams();
  const wishlistId = params.id as string;

  const { data, setField, handleSubmit, saving } =
    useWishlistPurchase(wishlistId);
  const { data: categories, isLoading: loadingCategories } = useCategoriesAll();

  const { data: brands, isLoading: loadingBrands } = useBrandsAll();
  const childCategories = categories.filter(
    (category: any) => category.parentId !== null,
  );

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Backup", value: "backup" },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
      <CardHeader
        title="PURCHASE WISHLIST ITEM"
        icon={ShoppingCartSimple}
        color="secondary"
      />

      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Actual Purchase Price"
            type="money"
            placeholder="0"
            value={data.price ?? ""}
            onChange={(val) => setField("price", val)}
          />
          <FormInput
            label="Brand"
            options={brands.map((brand: any) => ({
              label: brand.name,
              value: brand.id,
            }))}
            dropdownType="select"
            value={data.brandId}
            onChange={(val) => setField("brandId", val)}
            placeholder="Select brand"
            disabled={loadingBrands}
          />
          <FormInput
            label="Category"
            options={childCategories.map((cat: any) => ({
              label: cat.name,
              value: cat.id,
            }))}
            dropdownType="select"
            value={data.categoryId}
            onChange={(val) => setField("categoryId", val)}
            placeholder="Select category"
            disabled={loadingCategories}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Status *"
            options={statusOptions}
            dropdownType="select"
            value={data.status || "active"}
            onChange={(val) => setField("status", val)}
          />
          <FormInput
            label="Purchase Date"
            type="date"
            value={data.purchaseDate ? data.purchaseDate.split("T")[0] : ""}
            onChange={(val) => setField("purchaseDate", val)}
          />
          <FormInput
            label="Expiry Date"
            type="date"
            value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
            onChange={(val) => setField("expiryDate", val)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Date Opened"
            type="date"
            value={data.dateOpened ? data.dateOpened.split("T")[0] : ""}
            onChange={(val) => setField("dateOpened", val)}
          />
          <FormInput
            label="PAO (Months)"
            type="number"
            placeholder="e.g. 12"
            value={data.paoMonths ?? ""}
            onChange={(val) => setField("paoMonths", val)}
          />
          <FormInput
            label="Initial Rating (1-5)"
            type="number"
            placeholder="e.g. 5"
            value={data.rating ?? ""}
            onChange={(val) => setField("rating", val)}
          />
        </div>

        <FormInput
          label="Notes / Reason"
          placeholder="Optional purchase notes..."
          value={data.notes}
          onChange={(val) => setField("notes", val)}
        />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="secondary"
            onClick={handleSubmit}
            pressable
          >
            {saving ? (
              "Processing Purchase..."
            ) : (
              <>
                <Check size={18} /> Confirm Purchase
              </>
            )}
          </CardBox>
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={() => router.back()}
            pressable
          >
            <X size={18} /> Cancel
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
