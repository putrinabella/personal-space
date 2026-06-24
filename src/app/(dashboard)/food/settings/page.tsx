"use client";

import CardHeader from "@/components/CardHeader";
import CardSection from "@/components/CardSection";
import { Paintbrush, Sliders } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <CardHeader title="S E T T I N G S" icon={Sliders} color="accent" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CardSection
            title="Cinema Ticket Stubs"
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
          <div>
            {" "}
            <CardSection
              title="Cinema Ticket Stubs 🍿"
              headerColor="accent"
              align="center"
            ></CardSection>
          </div>
          <div>Konten kanan bawah</div>
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
