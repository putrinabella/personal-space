"use client";

import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { Check, X, PiggyBank } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSavingForm } from "@/features/finance/saving/hooks/useSavingForm";
import { usePocketAll } from "@/features/finance/pockets/hooks/usePocketAll";

export default function CreateSavingPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useSavingForm();

  // Mengambil data pockets untuk pilihan dropdown pocketId
  const { data: dataPockets, isLoading: loadingPockets } = usePocketAll({
    type: "saving",
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader title="SET SAVING GOAL" icon={PiggyBank} color="secondary" />
      <CardBox
        className="p-4 md:p-6 flex flex-col gap-6 bg-base-100 border-2 border-neutral shadow-sm"
        rounded="2xl"
      >
        {/* Name Saving Goal */}
        <FormInput
          label="Name"
          placeholder="e.g. Emergency Fund"
          value={data.name || ""}
          onChange={(val) => setField("name", val)}
          required
        />

        {/* Pocket Selection (pocketId) */}
        <FormInput
          label="Pocket"
          required
          options={dataPockets.map((pocket) => ({
            label: pocket.name,
            value: pocket.id,
          }))}
          dropdownType="select"
          value={data.pocketId || ""}
          onChange={(val) => setField("pocketId", val)}
          placeholder="Select pocket"
          disabled={loadingPockets}
        />

        {/* Target Amount */}
        <FormInput
          label="Target Amount"
          type="money"
          placeholder="0"
          value={data.targetAmount || ""}
          onChange={(val) => setField("targetAmount", val)}
          required
        />

        {/* Target Date (Opsional) */}
        <FormInput
          type="date"
          label="Target Date"
          value={data.targetDate || ""}
          onChange={(val) => setField("targetDate", val)}
        />

        {/* Description (Opsional) */}
        <FormInput
          label="Description"
          placeholder="Add a note or description (optional)"
          value={data.description || ""}
          onChange={(val) => setField("description", val)}
        />

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1 cursor-pointer"
            rounded="xl"
            color="accent"
            onClick={handleSubmit}
            pressable
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Check size={18} /> Save Saving Goal
              </>
            )}
          </CardBox>

          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1 cursor-pointer"
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
