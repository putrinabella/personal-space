"use client";

import CardHeader from "@/components/CardHeader";
import CardSection from "@/components/CardSection";
import Pagination from "@/components/Pagination";
import { useCategoriesList } from "@/features/food/categories/hooks/useCategoriesList";
import { Paintbrush, Sliders } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [page, setPage] = useState(1);
  const { data, loading, error, total, lastPage, perPage } =
    useCategoriesList(page);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Terjadi kesalahan saat memuat data.</div>;

  return (
    <div className="flex flex-col gap-6">
      <CardHeader title="S E T T I N G S" icon={Sliders} color="accent" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {/* <CardHeader title="Categories" icon={Sliders} color="accent" /> */}
          <CardSection
            title="Categories"
            headerColor="accent"
            headerClassName="text-accent-content"
            rounded="3xl"
            shadowSize="lg"
            align="center"
          >
            <p className="text-body">
              Koleksi review film dan potongan tiket bioskop aesthetic-mu segera
              hadir!
            </p>
          </CardSection>
        </div>

        {/* Kanan - 2 bagian */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <CardSection title="Daftar Kategori">
            <div className="grid gap-4">
              {data.map((category) => (
                <div key={category.id} className="p-4 border rounded-lg">
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="text-sm">Slug: {category.iconSlug}</p>
                </div>
              ))}
            </div>

            {/* 5. Implementasi Pagination */}
            <Pagination
              page={page}
              lastPage={lastPage}
              total={total}
              perPage={perPage}
              onPageChange={(newPage) => setPage(newPage)} // Update state saat pindah halaman
            />
          </CardSection>
        </div>
      </div>

      <CardSection
        title="Info Tambahan"
        headerColor="base-200"
        variant="normal"
      >
        <p>Konten pendukung di sini...</p>
      </CardSection>
      <CardSection title="TEMA DAN TAMPILAN" icon={Paintbrush}>
        {/* 🎨 Isi dengan opsi tema Ratu di sini */}
        <p className="text-sm font-bold text-neutral/70">
          Pilihan tema istana akan muncul di sini segera! ✨
        </p>
      </CardSection>
    </div>
  );
}
