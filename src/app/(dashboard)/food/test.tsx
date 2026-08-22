"use client";

import CardBox from "@/shared/components/CardBox";
import Pagination from "@/shared/components/Pagination";
import { useLogsList } from "@/features/food/dashboard/log/hooks/useLogList";
import {
  Calendar,
  ForkKnifeIcon,
  GearSixIcon,
  Hamburger,
  MapPin,
  MapPinAreaIcon,
  Star,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function FoodView() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: foodLogs,
    loading,

    total,
    lastPage,
    perPage,
  } = useLogsList(page);
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-2 block">
            Eounia / Food Diary
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#2D2A2A]">
            Culinary Archive
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium italic">
            &quot;Curating flavors, documenting the soul of every bite.&quot;
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="base-300"
            href="/food/settings"
            pressable
          >
            <GearSixIcon weight="bold" size={18} />
            <span>Config</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="secondary"
            href="/food/restaurant"
            pressable
          >
            <MapPinAreaIcon weight="bold" size={18} />
            <span>Places</span>
          </CardBox>

          <CardBox
            className="px-4 py-2 flex items-center gap-2 text-sm md:text-base font-bold"
            rounded="xl"
            color="accent"
            href="/food/create"
            pressable
          >
            <ForkKnifeIcon weight="bold" size={18} />
            <span>New Entry</span>
          </CardBox>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#FFF] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] flex items-center gap-4">
          <div className="p-3 bg-[#C3E6CB] border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A]">
            <Hamburger className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Kuliner
            </p>
            <h3 className="text-2xl font-black mt-0.5">142 Rasa</h3>
          </div>
        </div>

        <div className="bg-[#FFF] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] flex items-center gap-4">
          <div className="p-3 bg-[#FDF2B5] border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A]">
            <Star className="w-6 h-6 fill-[#2D2A2A]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Resto Terfavorit
            </p>
            <h3 className="text-2xl font-black mt-0.5">Bakmie GM</h3>
          </div>
        </div>

        <div className="bg-[#FFF] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] flex items-center gap-4">
          <div className="p-3 bg-[#99D9EA] border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A]">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rating Avg
            </p>
            <h3 className="text-2xl font-black mt-0.5">8.7 / 10</h3>
          </div>
        </div>

        <div className="bg-[#FFF] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] flex items-center gap-4">
          <div className="p-3 bg-[#EAE7DD] border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A]">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Wilayah
            </p>
            <h3 className="text-2xl font-black mt-0.5">12 Zona</h3>
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN WIDGETS: Model Tiket / Blok Box Popcorn
         ========================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
        <div className="lg:col-span-1 bg-white border-3 border-[#2D2A2A] rounded-2xl shadow-[6px_6px_0px_#2D2A2A] overflow-hidden flex flex-col">
          <div className="bg-[#FDF2B5] border-b-3 border-[#2D2A2A] px-5 py-3 font-black text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>KALENDER KULINER</span>
            </div>
            <span className="text-xs bg-white border-2 border-[#2D2A2A] px-2 py-0.5 rounded-md">
              2026
            </span>
          </div>

          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-[#FAF9F5]">
            <div className="w-14 h-14 bg-[#99D9EA] border-2 border-[#2D2A2A] text-[#2D2A2A] rounded-xl flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2D2A2A] mb-4">
              24
            </div>
            <p className="font-bold text-sm">Hari ini belum makan luar?</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[180px]">
              Silakan catat petualangan kuliner estetikmu hari ini!
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border-3 border-[#2D2A2A] rounded-2xl shadow-[6px_6px_0px_#2D2A2A] overflow-hidden flex flex-col">
          <div className="bg-[#99D9EA] border-b-3 border-[#2D2A2A] px-5 py-3 font-black text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>PETA KOORDINAT RASA</span>
            </div>
          </div>

          <div className="p-6 flex-1 bg-[#FAF9F5] relative flex items-center justify-center min-h-[250px]">
            <div className="absolute inset-0 bg-[radial-gradient(#EAE7DD_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-[#2D2A2A] shadow-[2px_2px_0px_#2D2A2A] text-xs font-black mb-1 animate-bounce">
                🍜 Bakmie GM Thamrin
              </div>
              <MapPin className="w-8 h-8 text-[#2D2A2A] fill-[#C3E6CB]" />
            </div>
          </div>
        </div>
      </section>
      <div>
        {loading ? (
          <div className="p-12 text-center text-base-500">
            Loading culinary spots...
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foodLogs?.map((data) => (
                <CardBox
                  key={data.id}
                  className="p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow border border-base-200"
                  rounded="2xl"
                  color="base-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <h3 className="heading-h3 font-bold leading-tight">
                        {data.name}
                      </h3>
                      <p className="text-body opacity-70 mt-1 font-bold">
                        {data.price}
                      </p>
                    </div>
                  </div>
                </CardBox>
              ))}
            </div>

            <Pagination
              page={page}
              lastPage={lastPage ?? 1}
              total={total ?? 0}
              perPage={perPage ?? 10}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
      {/* ==========================================
          FLOATING BOTTOM NAV BAR (Sesuai Persis image_7aedd2.png)
         ========================================== */}
      {/* ==========================================
          MODAL BOX: Input Bertema Retro Tiket
         ========================================== */}
      {isInputModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2A2A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg border-4 border-[#2D2A2A] rounded-2xl shadow-[8px_8px_0px_#2D2A2A] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#99D9EA] border-b-3 border-[#2D2A2A] px-6 py-4 text-[#2D2A2A] flex items-center justify-between">
              <h3 className="font-black text-lg tracking-wide uppercase flex items-center gap-2">
                <span>👑</span> CATAT KULINER BARU
              </h3>
              <button
                onClick={() => setIsInputModalOpen(false)}
                className="border-2 border-[#2D2A2A] bg-white text-[#2D2A2A] w-7 h-7 rounded-md font-black flex items-center justify-center text-xs hover:bg-rose-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 bg-[#FAF9F5]">
              <div>
                <label className="block text-xs font-black uppercase text-[#2D2A2A] tracking-wider mb-1.5">
                  Nama Makanan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bakmi Ayam Jamur"
                  className="w-full px-3 py-2.5 bg-white border-2 border-[#2D2A2A] rounded-xl text-sm font-medium focus:outline-none focus:bg-amber-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#2D2A2A] tracking-wider mb-1.5">
                    Kategori
                  </label>
                  <select className="w-full px-3 py-2.5 bg-white border-2 border-[#2D2A2A] rounded-xl text-sm font-medium focus:outline-none focus:bg-amber-50">
                    <option>Noodle & Pasta</option>
                    <option>Rice Dishes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-[#2D2A2A] tracking-wider mb-1.5">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="38500"
                    className="w-full px-3 py-2.5 bg-white border-2 border-[#2D2A2A] rounded-xl text-sm font-medium focus:outline-none focus:bg-amber-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#2D2A2A] tracking-wider mb-1.5">
                  Ulasan
                </label>
                <textarea
                  rows={3}
                  placeholder="Bagaimana rasanya, Yang Mulia ?..."
                  className="w-full px-3 py-2.5 bg-white border-2 border-[#2D2A2A] rounded-xl text-sm font-medium focus:outline-none focus:bg-amber-50"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t-3 border-[#2D2A2A] flex items-center justify-end gap-3">
              <button
                onClick={() => setIsInputModalOpen(false)}
                className="px-4 py-2 border-2 border-[#2D2A2A] text-[#2D2A2A] text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setIsInputModalOpen(false)}
                className="px-5 py-2.5 bg-[#C3E6CB] border-2 border-[#2D2A2A] text-[#2D2A2A] text-xs font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_#2D2A2A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                SIMPAN DIARY 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
