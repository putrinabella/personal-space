"use client";

import { useParams, useRouter } from "next/navigation";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import {
  Check,
  ArrowLeft,
  Plus,
  PencilSimpleIcon,
  X,
} from "@phosphor-icons/react";
import { useEntityForm } from "@/features/food/hooks/useEntityForm";
import { EntityFields } from "@/features/food/components/EntityField";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();

  const entity = params.entity as
    | "categories"
    | "cuisines"
    | "diningType"
    | "tags";
  const id = params.id as string; // Ambil ID dari URL
  const { data, setField, handleSubmit, saving } = useEntityForm(entity, id);
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader
        title={`EDIT ${entity.toUpperCase()}`}
        icon={PencilSimpleIcon}
        color="secondary"
      />

      <CardBox className="p-8 flex flex-col gap-6" rounded="2xl">
        <EntityFields entity={entity} data={data} setField={setField} />

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
