"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { ForkKnife, Check, ArrowLeft, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCategoryAll } from "@/features/food/category/hooks/useCategoryAll";
import { useFoodAll } from "@/features/food/dashboard/hooks/useFoodAll";
import { useRestaurantAll } from "@/features/food/restaurants/hooks/useRestaurantAll";
import { useLogForm } from "@/features/food/dashboard/log/hooks/useLogForm";
import { useCuisinesAll } from "@/features/food/cuisines/hooks/useCuisinesAll";
import { useDiningTypeAll } from "@/features/food/diningType/hooks/useDiningTypeAll";

export default function CreateFoodEntryPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const { data, setField, handleSubmit, saving } = useLogForm();

  const { data: dataRestaurant, isLoading: loadingRestaurant } =
    useRestaurantAll();
  const { data: dataCategory, isLoading: loadingCategory } = useCategoryAll();
  const { data: dataCuisines, isLoading: loadingCuisines } = useCuisinesAll();
  const { data: dataDiningType, isLoading: loadingDiningType } =
    useDiningTypeAll();
  const { data: dataFood, isLoading: loadingFood } = useFoodAll(
    data.restaurantId,
  );

  const onSave = async () => {
    setField("isNewFood", mode === "new");
    await handleSubmit();
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader
        title="LOG NEW CULINARY ENTRY"
        icon={ForkKnife}
        color="primary"
      />

      <CardBox className="p-4 md:p-6 flex flex-col gap-6" rounded="2xl">
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
        <FormInput
          label="Restaurant"
          options={dataRestaurant.map((r) => ({ label: r.name, value: r.id }))}
          dropdownType="select"
          value={data.restaurantId}
          onChange={(val) => {
            setField("restaurantId", val);
            setField("foodId", ""); // Reset saat restoran ganti
          }}
          placeholder="Select restaurant"
          disabled={loadingRestaurant}
        />
        {mode === "existing" ? (
          <div className="flex flex-col gap-4">
            <FormInput
              label="Menu"
              disabled={!data.restaurantId}
              options={dataFood.map((f) => ({
                label: f.foodName,
                value: f.id,
              }))}
              dropdownType="select"
              value={data.foodId} // Pastikan field ini ada di LogFormData
              onChange={(val) => setField("foodId", val)}
              placeholder={loadingFood ? "Loading..." : "Select food"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 border border-primary/20 rounded-xl bg-primary/5">
            <p className="font-bold text-primary">New Menu Details</p>

            <FormInput
              label="Food Name"
              value={data.foodName}
              onChange={(val) => setField("foodName", val)}
              placeholder="e.g. Special Beef Ramen"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Category"
                required
                options={dataCategory.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                dropdownType="select"
                value={data.categoryId}
                onChange={(val) => setField("categoryId", val)}
                placeholder="Select category"
                disabled={loadingCategory}
              />
              <FormInput
                label="Cuisine"
                required
                options={dataCuisines.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                dropdownType="select"
                value={data.cuisineId}
                onChange={(val) => setField("cuisineId", val)}
                placeholder="Select cuisine"
                disabled={loadingCuisines}
              />
            </div>

            <FormInput
              label="Dining Type"
              required
              options={dataDiningType.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
              dropdownType="select"
              value={data.diningTypeId}
              onChange={(val) => setField("diningTypeId", val)}
              placeholder="Select dining type"
              disabled={loadingDiningType}
            />

            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={data.isFavoriteFood}
                  onChange={(e) => setField("isFavoriteFood", e.target.checked)}
                />
                <span className="text-sm font-medium">Favorite Food</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={data.isFavoriteDrink}
                  onChange={(e) =>
                    setField("isFavoriteDrink", e.target.checked)
                  }
                />
                <span className="text-sm font-medium">Favorite Drink</span>
              </label>
            </div>
          </div>
        )}

        <hr />

        <p className="font-bold">Visit Details</p>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Price"
            placeholder="Rp 0"
            value={data.price}
            onChange={(val) => setField("price", val)}
          />
          <FormInput
            label="Date"
            type="date"
            value={data.dateVisited}
            onChange={(val) => setField("dateVisited", val)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="His Rating"
            type="number"
            placeholder="0-10"
            value={data.ratingHis}
            onChange={(val) => setField("ratingHis", val)}
          />
          <FormInput
            label="Her Rating"
            type="number"
            placeholder="0-10"
            value={data.ratingHer}
            onChange={(val) => setField("ratingHer", val)}
          />
        </div>

        <FormInput
          label="Review"
          placeholder="How was it today?"
          value={data.reviewText}
          onChange={(val) => setField("reviewText", val)}
        />

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="accent"
            onClick={onSave}
            pressable
          >
            {saving ? (
              "Saving..."
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
            <X size={18} /> Cancel
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
