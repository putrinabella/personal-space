"use client";

import React, { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { formatDateIndo } from "@/utils/dateFormatter";
import {
  ClockCountdown,
  CalendarBlank,
  ShieldWarning,
} from "@phosphor-icons/react";

// Data dummy sesuai dengan yang Anda berikan
const dummyAlertsData = {
  expiredUnits: [
    {
      id: "7dea7f3c-1631-4a2a-924d-a1c1ed0a455e",
      itemId: "bb1cab3f-1fdb-426d-8377-1a2ad84ebbe3",
      status: "active",
      price: "300000.00",
      purchaseDate: "2026-08-05T00:00:00.000Z",
      expiryDate: "2026-08-15T00:00:00.000Z",
      dateOpened: "2026-07-30T00:00:00.000Z",
      paoMonths: 34,
      item: {
        name: "nananana",
        minStock: 1,
        rating: 2,
      },
      brand: {
        name: "Skin 1004",
      },
      daysLeft: -6,
    },
    {
      id: "41bbeb24-2437-462c-9433-94830e84d31e",
      itemId: "bb1cab3f-1fdb-426d-8377-1a2ad84ebbe3",
      status: "backup",
      price: "30000.00",
      purchaseDate: "2026-08-01T00:00:00.000Z",
      expiryDate: "2026-08-19T00:00:00.000Z",
      dateOpened: "2026-08-14T00:00:00.000Z",
      paoMonths: 4,
      item: {
        name: "nananana",
        minStock: 1,
        rating: 2,
      },
      brand: {
        name: "Skin 1004",
      },
      daysLeft: -2,
    },
  ],
  expiringSoon: [
    {
      id: "07442bbf-eee6-4b34-843c-64b7455ab4d2",
      itemId: "bb1cab3f-1fdb-426d-8377-1a2ad84ebbe3",
      status: "backup",
      price: "300000.00",
      purchaseDate: "2026-08-14T00:00:00.000Z",
      expiryDate: "2026-08-28T00:00:00.000Z",
      dateOpened: "2026-08-06T00:00:00.000Z",
      paoMonths: 2,
      item: {
        name: "nananana",
        minStock: 1,
        rating: 2,
      },
      brand: {
        name: "Skin 1004",
      },
      daysLeft: 7,
    },
    {
      id: "c08b8759-f5cb-40b6-88de-efde0bd682e8",
      itemId: "bb1cab3f-1fdb-426d-8377-1a2ad84ebbe3",
      status: "backup",
      price: "277777.00",
      purchaseDate: "2026-08-20T00:00:00.000Z",
      expiryDate: "2026-08-29T00:00:00.000Z",
      dateOpened: "2026-08-29T00:00:00.000Z",
      paoMonths: 3,
      item: {
        name: "nananana",
        minStock: 1,
        rating: 2,
      },
      brand: {
        name: "Skin 1004",
      },
      daysLeft: 8,
    },
  ],
  calendarEvents: [
    {
      id: "7dea7f3c-1631-4a2a-924d-a1c1ed0a455e",
      title: "nananana (Skin 1004)",
      date: "2026-08-15",
      type: "expiry",
      daysLeft: -6,
    },
    {
      id: "41bbeb24-2437-462c-9433-94830e84d31e",
      title: "nananana (Skin 1004)",
      date: "2026-08-19",
      type: "expiry",
      daysLeft: -2,
    },
    {
      id: "07442bbf-eee6-4b34-843c-64b7455ab4d2",
      title: "nananana (Skin 1004)",
      date: "2026-08-28",
      type: "expiry",
      daysLeft: 7,
    },
    {
      id: "c08b8759-f5cb-40b6-88de-efde0bd682e8",
      title: "nananana (Skin 1004)",
      date: "2026-08-29",
      type: "expiry",
      daysLeft: 8,
    },
  ],
};

export default function BeautyAlertsPage() {
  const [data] = useState(dummyAlertsData);

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="heading-h2 font-extrabold text-base-content">
          Beauty Product Alerts
        </h1>
        <p className="text-body text-base-content/70">
          Pantau produk skincare dan makeup yang sudah kadaluarsa atau mendekati
          batas waktu penggunaan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION: Sudah Expired */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ShieldWarning size={20} weight="bold" className="text-error" />
            <h2 className="font-extrabold text-lg text-base-content">
              Sudah Expired ({data.expiredUnits.length})
            </h2>
          </div>

          {data.expiredUnits.length === 0 ? (
            <p className="text-caption italic text-base-content/50 p-4 bg-base-200/50 rounded-2xl">
              Tidak ada produk yang expired.
            </p>
          ) : (
            data.expiredUnits.map((unit: any) => (
              <CardBox
                key={unit.id}
                className="p-5 flex flex-col gap-3 border border-error/30 bg-base-100 shadow-sm relative overflow-hidden"
                rounded="2xl"
              >
                <div className="absolute top-0 right-0 bg-error text-error-content text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                  Expired {Math.abs(unit.daysLeft)} Hari Lalu
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-caption uppercase tracking-wider font-bold text-base-content/50">
                    {unit.brand?.name} • Skincare
                  </span>
                  <h3 className="heading-h3 font-extrabold text-base-content">
                    {unit.item.name}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-base-200/60 p-3 rounded-xl text-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Harga
                    </span>
                    <span className="text-data font-semibold">
                      {formatRupiah(unit.price)}
                    </span>
                  </div>
                  <div className="flex flex-col border-x border-base-300">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Status
                    </span>
                    <span className="text-data font-bold uppercase text-error">
                      {unit.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Expired Date
                    </span>
                    <span className="text-data font-semibold text-error">
                      {formatDateIndo(unit.expiryDate)}
                    </span>
                  </div>
                </div>
              </CardBox>
            ))
          )}
        </div>

        {/* SECTION: Mendekati Expired (Expiring Soon) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ClockCountdown size={20} weight="bold" className="text-warning" />
            <h2 className="font-extrabold text-lg text-base-content">
              Mendekati Expired ({data.expiringSoon.length})
            </h2>
          </div>

          {data.expiringSoon.length === 0 ? (
            <p className="text-caption italic text-base-content/50 p-4 bg-base-200/50 rounded-2xl">
              Tidak ada produk yang mendekati expired.
            </p>
          ) : (
            data.expiringSoon.map((unit: any) => (
              <CardBox
                key={unit.id}
                className="p-5 flex flex-col gap-3 border border-warning/30 bg-base-100 shadow-sm relative overflow-hidden"
                rounded="2xl"
              >
                <div className="absolute top-0 right-0 bg-warning text-warning-content text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                  {unit.daysLeft} Hari Lagi
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-caption uppercase tracking-wider font-bold text-base-content/50">
                    {unit.brand?.name} • Skincare
                  </span>
                  <h3 className="heading-h3 font-extrabold text-base-content">
                    {unit.item.name}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-base-200/60 p-3 rounded-xl text-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Harga
                    </span>
                    <span className="text-data font-semibold">
                      {formatRupiah(unit.price)}
                    </span>
                  </div>
                  <div className="flex flex-col border-x border-base-300">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Status
                    </span>
                    <span className="text-data font-bold uppercase text-warning">
                      {unit.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-base-content/60">
                      Expiry Date
                    </span>
                    <span className="text-data font-semibold">
                      {formatDateIndo(unit.expiryDate)}
                    </span>
                  </div>
                </div>
              </CardBox>
            ))
          )}
        </div>
      </div>

      {/* SECTION: Calendar Events Preview */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2">
          <CalendarBlank size={20} weight="bold" className="text-primary" />
          <h2 className="font-extrabold text-lg text-base-content">
            Timeline Jadwal Terdekat
          </h2>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          {data.calendarEvents.map((evt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-base-200 last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl font-bold text-xs">
                  {evt.date}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base-content">
                    {evt.title}
                  </span>
                  <span className="text-caption text-base-content/60 uppercase">
                    Tipe: {evt.type}
                  </span>
                </div>
              </div>
              <span
                className={`badge badge-sm font-bold ${evt.daysLeft < 0 ? "badge-error" : "badge-ghost"}`}
              >
                {evt.daysLeft < 0
                  ? `Lewat ${Math.abs(evt.daysLeft)} hari`
                  : `${evt.daysLeft} hari lagi`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
