"use client";

import { use } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";
import { Check, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRestaurantsForm } from "@/features/food/restaurants/hooks/useRestaurantForm";

export default function EditRestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params); // Mengambil ID dari URL
  const { data, setField, handleSubmit, saving, loading } =
    useRestaurantsForm(id);

  if (loading) return <div className="p-20 text-center">Memuat data...</div>;

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto ">
      <CardHeader title="EDIT RESTORAN" icon={MapPinAreaIcon} color="warning" />

      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        <FormInput
          label="Nama Restoran/Cafe"
          value={data.name}
          onChange={(val) => setField("name", val)}
          required
        />

        <FormInput
          label="Alamat Lengkap"
          value={data.address}
          onChange={(val) => setField("address", val)}
          required
        />

        <FormInput
          label="Google Maps URL"
          value={data.googleMapsUrl}
          onChange={(val) => setField("googleMapsUrl", val)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() =>
              setField("isFavoriteRestaurant", !data.isFavoriteRestaurant)
            }
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${data.isFavoriteRestaurant ? "border-accent bg-accent/10" : "border-base-200"}`}
          >
            <p className="font-bold">Kategori Restoran</p>
          </div>
          <div
            onClick={() => setField("isFavoriteCafe", !data.isFavoriteCafe)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${data.isFavoriteCafe ? "border-accent bg-accent/10" : "border-base-200"}`}
          >
            <p className="font-bold">Kategori Cafe</p>
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
