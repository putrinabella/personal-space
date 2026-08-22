"use client";

import { use } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { Check, ArrowLeft, FlowerLotusIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useUnitForm } from "@/features/beauty/unit/hooks/useUnitForm";

export default function EditUnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data, setField, handleSubmit, saving, loading } = useUnitForm(id);

  if (loading)
    return <div className="p-20 text-center">Memuat data unit...</div>;

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
      <CardHeader
        title={(data as any).productName || "EDIT BEAUTY UNIT"}
        icon={FlowerLotusIcon}
        color="accent"
      />
      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        <div className="flex flex-col gap-4">
          {/* Status Unit */}
          <FormInput
            label="Status *"
            options={[
              { label: "Active", value: "active" },
              { label: "Backup", value: "backup" },
              { label: "Finished", value: "finished" },
              { label: "Discarded", value: "discarded" },
              { label: "Expired", value: "expired" },
            ]}
            dropdownType="select"
            value={data.status || "active"}
            onChange={(val) => setField("status", val)}
            placeholder="Select status"
          />

          {/* Price */}
          <FormInput
            label="Price"
            type="number"
            placeholder="0"
            value={data.price ?? ""}
            onChange={(val) => setField("price", val)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Purchase Date */}
            <FormInput
              label="Purchase Date"
              type="date"
              value={data.purchaseDate ? data.purchaseDate.split("T")[0] : ""}
              onChange={(val) => setField("purchaseDate", val)}
            />

            {/* Expiry Date */}
            <FormInput
              label="Expiry Date"
              type="date"
              value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
              onChange={(val) => setField("expiryDate", val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Opened */}
            <FormInput
              label="Date Opened"
              type="date"
              value={data.dateOpened ? data.dateOpened.split("T")[0] : ""}
              onChange={(val) => setField("dateOpened", val)}
            />

            {/* PAO Months */}
            <FormInput
              label="PAO (Period After Opening) in Months"
              type="number"
              placeholder="e.g. 12"
              value={data.paoMonths ?? ""}
              onChange={(val) => setField("paoMonths", val)}
            />
          </div>
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
                <Check size={18} className="inline mr-2" /> Update Unit
              </>
            )}
          </CardBox>
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
