"use client";

import { use } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { Sparkle, Check, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";
import { useBrandsAll } from "@/features/beauty/brands/hooks/useBrandsAll";
import { useConcernsAll } from "@/features/beauty/concerns/hooks/useConcernsAll";
import { useProductForm } from "@/features/beauty/product/hooks/useProductForm";

export default function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data, setField, handleSubmit, saving, loading } = useProductForm(id);

  const { data: categories, isLoading: loadingCategories } = useCategoriesAll();
  const { data: brands, isLoading: loadingBrands } = useBrandsAll();
  const { data: concerns, isLoading: loadingConcerns } = useConcernsAll();

  const childCategories = categories.filter(
    (category: any) => category.parentId !== null,
  );

  if (loading) return <div className="p-20 text-center">Memuat data...</div>;

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
      <CardHeader
        title="EDIT MASTER PRODUCT"
        icon={Sparkle}
        color="secondary"
      />

      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        <div className="flex flex-col gap-4">
          <FormInput
            label="Product Name *"
            placeholder="e.g. Skin1004 Madagascar Centella Ampoule"
            value={data.name}
            onChange={(val) => setField("name", val)}
          />

          {/* Grid rapi 2 kolom untuk Category, Brand, Store, dan Min Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Category *"
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
            <FormInput
              label="Brand *"
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
              label="Minimum Stock Warning"
              type="number"
              placeholder="1"
              value={data.minStock}
              onChange={(val) => setField("minStock", val)}
            />
            <FormInput
              label="Rating (1-5)"
              type="number"
              placeholder="e.g. 5"
              value={data.rating ?? ""}
              onChange={(val) => setField("rating", val)}
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-semibold text-base-content/85">
              Skin Concerns (Optional)
            </label>
            {loadingConcerns ? (
              <p className="text-xs text-base-content/50">
                Loading concerns...
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {concerns.map((con: any) => {
                  const isSelected =
                    Array.isArray(data.concernIds) &&
                    data.concernIds.includes(con.id);
                  return (
                    <CardBox
                      key={con.id}
                      className={`p-3 flex items-center justify-between text-sm cursor-pointer transition-all ${
                        isSelected
                          ? "border-2 border-secondary bg-secondary/10 font-semibold"
                          : "bg-base-200/50 hover:bg-base-200"
                      }`}
                      rounded="xl"
                      pressable
                      onClick={() => {
                        const currentList = Array.isArray(data.concernIds)
                          ? [...data.concernIds]
                          : [];
                        if (isSelected) {
                          const updated = currentList.filter(
                            (id) => id !== con.id,
                          );
                          setField("concernIds", updated);
                        } else {
                          currentList.push(con.id);
                          setField("concernIds", currentList);
                        }
                      }}
                    >
                      <span className="truncate">{con.name}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected
                            ? "bg-secondary border-secondary text-secondary-content"
                            : "border-base-300"
                        }`}
                      >
                        {isSelected && <Check size={14} weight="bold" />}
                      </div>
                    </CardBox>
                  );
                })}
              </div>
            )}
          </div>

          <FormInput
            label="Notes (Optional)"
            placeholder="Add extra details, ingredients, or review notes..."
            value={data.notes || ""}
            onChange={(val) => setField("notes", val)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex-1 text-center font-bold"
            rounded="xl"
            color="warning"
            onClick={handleSubmit}
            pressable
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Check size={18} className="inline mr-2" /> Update Data
              </>
            )}
          </CardBox>{" "}
          <CardBox
            className="px-6 py-3 flex-1 text-center font-bold"
            rounded="xl"
            color="base-300"
            onClick={() => router.back()}
            pressable
          >
            <ArrowLeft size={18} className="inline mr-2" /> Cancel
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
