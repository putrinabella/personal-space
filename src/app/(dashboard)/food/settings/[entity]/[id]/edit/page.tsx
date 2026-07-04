"use client";

import { useParams, useRouter } from "next/navigation";
import CardBox from "@/components/CardBox";
import CardHeader from "@/components/CardHeader";
import FormInput from "@/components/FormInput";
import { Check, ArrowLeft, Plus } from "@phosphor-icons/react";
import { useEntityForm } from "@/hooks/useEntityForm";

export default function DynamicFormPage() {
  const router = useRouter();
  const params = useParams();

  const entity = params.entity as
    | "categories"
    | "cuisines"
    | "diningType"
    | "tags";
  const id = params.id as string;
  const isCreate = id === "create";

  console.log(id);
  console.log(isCreate);
  const { data, setField, handleSubmit, saving } = useEntityForm(
    entity,
    params.id as string, // Ini akan mengirim "create" atau "uuid"
  );
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader
        title={`${isCreate ? "TAMBAH" : "EDIT"} ${entity.toUpperCase()}`}
        icon={Plus}
        color="secondary"
      />

      <CardBox className="p-8 flex flex-col gap-6" rounded="2xl">
        {/* Render Field Berdasarkan Entity */}
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
              "Menyimpan..."
            ) : (
              <>
                <Check size={18} /> Simpan
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
            <ArrowLeft size={18} /> Batal
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}

// Komponen Helper untuk memisahkan field
function EntityFields({ entity, data, setField }: any) {
  return (
    <>
      {/* Semua memiliki nama */}
      {(entity === "categories" ||
        entity === "cuisines" ||
        entity === "diningType" ||
        entity === "tags") && (
        <FormInput
          label="Nama"
          value={data.name || ""}
          onChange={(val) => setField("name", val)}
          required
        />
      )}

      {/* Field Khusus */}
      {entity === "categories" && (
        <FormInput
          label="Icon Slug"
          value={data.iconSlug || ""}
          onChange={(val) => setField("iconSlug", val)}
        />
      )}

      {entity === "tags" && (
        <FormInput
          label="Background Color"
          value={data.bgColor || ""}
          onChange={(val) => setField("bgColor", val)}
          placeholder="#FFFFFF"
        />
      )}
    </>
  );
}
