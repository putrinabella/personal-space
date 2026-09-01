"use client";

import { use } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { Sparkle, Check, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useWishlistForm } from "@/features/beauty/wishlist/hooks/useWishlistForm";
import { useBrandsAll } from "@/features/beauty/brands/hooks/useBrandsAll";
import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";

export default function CreateBeautyWishlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data, setField, handleSubmit, saving } = useWishlistForm(id);
  const { data: brands, isLoading: loadingBrands } = useBrandsAll();
  const { data: categories, isLoading: loadingCategories } = useCategoriesAll();
  const childCategories = categories.filter(
    (category: any) => category.parentId !== null,
  );
  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <CardHeader title="EDIT WISHLIST" icon={Sparkle} color="accent" />

      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        <FormInput
          label="Product Name"
          value={data.name}
          onChange={(val) => setField("name", val)}
          placeholder="e.g. Matte Revolution Lipstick"
          required
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Estimated Price (Rp)"
            type="money"
            value={data.estimatedPrice}
            onChange={(val) => setField("estimatedPrice", val)}
            placeholder="0"
          />
          <FormInput
            label="Priority"
            options={[
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
            ]}
            dropdownType="select"
            value={data.priority || "Medium"}
            onChange={(val) => setField("priority", val)}
            placeholder="Select priority"
          />
        </div>
        <FormInput
          label="Store Link"
          value={data.storeLink}
          onChange={(val) => setField("storeLink", val)}
          placeholder="https://tokopedia.com/..."
        />
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="accent"
            onClick={handleSubmit}
            pressable
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Check size={18} /> Save
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
