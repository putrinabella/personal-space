"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Utensils,
  MapPin,
  Calendar,
  Settings,
  Plus,
  Star,
  TrendingUp,
  ChevronRight,
  Home,
  CreditCard,
  Film,
} from "lucide-react";

export default function FoodView() {
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  return (
    // Latar belakang kertas grid cream khas sesuai gambar image_7aedd2.png
    <div className="min-h-screen bg-[#FAF9F5] bg-[linear-gradient(to_right,#EAE7DD_1px,transparent_1px),linear-gradient(to_bottom,#EAE7DD_1px,transparent_1px)] bg-[size:24px_24px] p-6 md:p-10 text-[#2D2A2A] font-sans selection:bg-[#99D9EA]">
      {/* ==========================================
          HEADER AREA (Neo-Brutalist Style)
         ========================================== */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-[#2D2A2A] drop-shadow-[2px_2px_0px_#FFF]">
            Istana Kuliner Ratu 👑
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
            Koleksi review makanan dan catatan diary rasa estetik-mu!
          </p>
        </div>

        {/* Tombol dengan Bayangan Tebal Hitam khas Retro */}
        <div className="flex items-center gap-4">
          <Link
            href="/food/settings"
            className="flex items-center gap-2 px-5 py-3 bg-white border-3 border-[#2D2A2A] text-[#2D2A2A] rounded-2xl font-bold shadow-[4px_4px_0px_#2D2A2A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2D2A2A] transition-all text-sm"
          >
            <Settings className="w-4 h-4 text-[#2D2A2A]" />
            Settings
          </Link>

          <button
            onClick={() => setIsInputModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#99D9EA] border-3 border-[#2D2A2A] text-[#2D2A2A] rounded-2xl font-black shadow-[4px_4px_0px_#2D2A2A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2D2A2A] transition-all text-sm"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            TAMBAH DIARY
          </button>
        </div>
      </header>

      {/* ==========================================
          STATS SECTION: Kotak Pastel Berbingkai Tebal
         ========================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#FFF] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] flex items-center gap-4">
          <div className="p-3 bg-[#C3E6CB] border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A]">
            <Utensils className="w-6 h-6" />
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
            <TrendingUp className="w-6 h-6" />
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
        {/* Widget Kalender */}
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
            <p className="font-bold text-sm">Hari ini Ratu belum makan luar?</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[180px]">
              Silakan catat petualangan kuliner estetikmu hari ini!
            </p>
          </div>
        </div>

        {/* Widget Peta Jejak Restoran */}
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
                  Ulasan Ratu
                </label>
                <textarea
                  rows={3}
                  placeholder="Bagaimana rasanya, Yang Mulia Ratu?..."
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
