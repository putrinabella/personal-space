"use client";

import CardBox from "@/components/CardBox";
import CardHeader from "@/components/CardHeader";
import FormInput from "@/components/FormInput";
import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";
import { Check, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRestaurantsForm } from "@/features/food/restaurants/hooks/useRestaurantForm";

export default function CreateRestaurantPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useRestaurantsForm();

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto px-4 md:px-0">
      <CardHeader
        title="TAMBAH RESTORAN BARU"
        icon={MapPinAreaIcon}
        color="secondary"
      />

      <CardBox className="p-8 flex flex-col gap-6" rounded="2xl">
        <FormInput
          label="Nama Restoran/Cafe"
          value={data.name}
          onChange={(val) => setField("name", val)}
          placeholder="Contoh: Kedai Kopi Senja"
          required
        />

        <FormInput
          label="Alamat Lengkap"
          value={data.address}
          onChange={(val) => setField("address", val)}
          placeholder="Jl. Contoh No. 123..."
          required
        />

        <FormInput
          label="Google Maps URL"
          value={data.googleMapsUrl}
          onChange={(val) => setField("googleMapsUrl", val)}
          placeholder="https://maps.app.goo.gl/..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Checkbox untuk Restaurant */}
          <div
            onClick={() =>
              setField("isFavoriteRestaurant", !data.isFavoriteRestaurant)
            }
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              data.isFavoriteRestaurant
                ? "border-accent bg-accent/10"
                : "border-base-200"
            }`}
          >
            <p className="font-bold">Kategori Restoran</p>
            <p className="text-sm opacity-60">
              Tandai sebagai restoran favorit
            </p>
          </div>

          {/* Checkbox untuk Cafe (Menggunakan isFavoriteCafe) */}
          <div
            onClick={() => setField("isFavoriteCafe", !data.isFavoriteCafe)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              data.isFavoriteCafe
                ? "border-accent bg-accent/10"
                : "border-base-200"
            }`}
          >
            <p className="font-bold">Kategori Cafe</p>
            <p className="text-sm opacity-60">Tandai sebagai cafe favorit</p>
          </div>
        </div>

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
                <Check size={18} /> Simpan Data
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
            <ArrowLeft size={18} /> Batal
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
