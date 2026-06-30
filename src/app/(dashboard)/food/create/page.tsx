"use client";

import { useState } from "react";
import CardBox from "@/components/CardBox";
import CardHeader from "@/components/CardHeader";
import FormInput from "@/components/FormInput";
import { ForkKnife, Check, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCategoriesAll } from "@/features/food/categories/hooks/useCategoriesAll";
import { useFoodAll } from "@/features/food/foods/hooks/useFoodAll";
import { useFoodForm } from "@/features/food/foods/hooks/useFoodForm";

export default function CreateFoodEntryPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"existing" | "new">("existing");

  const { data, setField, handleSubmit, saving } = useFoodForm();
  const { data: dataFood } = useFoodAll();
  const { data: dataCategories } = useCategoriesAll();

  // const categoriesQuery = useCategoriesList(page);
  // const cuisinesQuery = useCuisinesList(page);
  // const diningTypeQuery = useDiningTypeList(page);
  // const tagsQuery = useTagsList(page);

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto px-4">
      <CardHeader
        title="LOG NEW CULINARY ENTRY"
        icon={ForkKnife}
        color="primary"
      />

      <CardBox className="p-8 flex flex-col gap-6" rounded="2xl">
        {/* Toggle Mode */}
        <div className="flex bg-base-200 p-1 rounded-xl">
          <button
            onClick={() => setMode("existing")}
            className={`flex-1 py-2 rounded-lg font-bold transition ${mode === "existing" ? "bg-white shadow" : "opacity-60"}`}
          >
            Select Existing Menu
          </button>
          <button
            onClick={() => setMode("new")}
            className={`flex-1 py-2 rounded-lg font-bold transition ${mode === "new" ? "bg-white shadow" : "opacity-60"}`}
          >
            Create New Menu
          </button>
        </div>

        {mode === "existing" ? (
          <div className="flex flex-col gap-4">
            <FormInput
              label="Menu"
              options={dataFood.map((food) => ({
                label: food.foodName,
                value: food.id,
              }))}
              dropdownType="select"
              value={data.foodName}
              onChange={(val) => setField("foodName", val)}
              placeholder={"Select food"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 border border-primary/20 rounded-xl bg-primary/5">
            <p className="font-bold text-primary">New Menu Details</p>
            <FormInput
              label="Food Name"
              placeholder="e.g. Special Beef Ramen"
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Categories"
                required
                options={dataCategories.map((categories) => ({
                  label: categories.name,
                  value: categories.id,
                }))}
                dropdownType="select"
                value={data.categoryId}
                onChange={(val) => setField("categoryId", val)}
                placeholder={"Select categories"}
              />
              <FormInput label="Cuisine" placeholder="e.g. Japanese" />
            </div>
          </div>
        )}

        <hr />

        {/* Transaction Log Details */}
        <p className="font-bold">Visit Details</p>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Price" placeholder="Rp 0" />
          <FormInput label="Date" type="date" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="His Rating" type="number" placeholder="0-10" />
          <FormInput label="Her Rating" type="number" placeholder="0-10" />
        </div>

        <FormInput label="Review" placeholder="How was it today?" />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="accent"
            onClick={handleSubmit}
            pressable
            // disabled={saving}
          >
            {saving ? (
              "Menyimpan..."
            ) : (
              <>
                <Check size={18} /> Save
              </>
            )}
          </CardBox>{" "}
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={() => router.back()}
            pressable
          >
            <ArrowLeft size={18} /> Cancel
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
