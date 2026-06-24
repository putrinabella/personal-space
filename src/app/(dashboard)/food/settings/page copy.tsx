"use client";

import React, { useState } from "react";
import {
  Sliders,
  Plus,
  Trash2,
  Tag,
  Paintbrush,
  Bell,
  ShieldCheck,
  Check,
  RotateCcw,
} from "lucide-react";
import CardSection from "@/components/CardSection";

export default function SettingsPage() {
  // State untuk manajemen Kategori Kuliner Ratu
  const [categories, setCategories] = useState([
    { id: 1, name: "Noodle & Pasta", count: 42, color: "#99D9EA" },
    { id: 2, name: "Rice Dishes", count: 28, color: "#FDF2B5" },
    { id: 3, name: "Sweet Desserts", count: 19, color: "#C3E6CB" },
    { id: 4, name: "Coffee & Drinks", count: 35, color: "#EAE7DD" },
  ]);
  const [newCategory, setNewCategory] = useState("");

  // State untuk pengaturan preferensi umum
  const [theme, setTheme] = useState("pastel-cream");
  const [notifications, setNotifications] = useState(true);

  // Fungsi menambah kategori baru
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const colors = ["#99D9EA", "#FDF2B5", "#C3E6CB", "#EAE7DD"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategory.trim(),
        count: 0,
        color: randomColor,
      },
    ]);
    setNewCategory("");
  };

  // Fungsi menghapus kategori
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 selection:bg-[#99D9EA]">
      {/* ==========================================
          HEADER SETTINGS (Retro Ticket Style)
         ========================================== */}
      <div className="bg-[#99D9EA] border-3 border-[#2D2A2A] p-6 rounded-2xl shadow-[6px_6px_0px_#2D2A2A] flex items-center gap-4">
        <div className="p-3 bg-white border-2 border-[#2D2A2A] rounded-xl text-[#2D2A2A] shadow-[2px_2px_0px_#2D2A2A]">
          <Sliders className="w-8 h-8 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-[#2D2A2A]">
            Pengaturan Istana ⚙️
          </h1>
          <p className="text-sm font-bold text-[#2D2A2A]/80 mt-1">
            Kelola kategori buku harian, tema visual, dan privasi Eunoia milik
            Ratu.
          </p>
        </div>
      </div>

      {/* ==========================================
          KONFIGURASI UTAMA (Grid System)
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border-3 border-[#2D2A2A] p-5 rounded-2xl shadow-[4px_4px_0px_#2D2A2A]">
            <h3 className="font-black text-sm uppercase tracking-wider text-slate-400 mb-4">
              Profil Sistem
            </h3>
            <div className="flex items-center gap-3 p-3 bg-[#FAF9F5] border-2 border-[#2D2A2A] rounded-xl">
              <div className="w-10 h-10 bg-[#FDF2B5] border-2 border-[#2D2A2A] rounded-full flex items-center justify-center font-black text-lg">
                👑
              </div>
              <div>
                <p className="font-black text-sm text-[#2D2A2A]">Ratu Eunoia</p>
                <p className="text-xs font-medium text-slate-400">
                  Level: Premium Foodie
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FDF2B5] border-3 border-[#2D2A2A] p-5 rounded-2xl shadow-[4px_4px_0px_#2D2A2A] space-y-2 text-xs font-bold text-[#2D2A2A]">
            <p className="font-black uppercase text-sm mb-1 tracking-wider text-[#2D2A2A]/60">
              💡 Info Estetika
            </p>
            <p>
              Setiap perubahan kategori akan langsung disuntikkan ke dalam form
              input diary kuliner dan grafik finansial Yang Mulia secara
              otomatis.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <CardSection title="KELOLA KATEGORI DIARY" icon={Tag}>
            <div className="space-y-6"></div>
          </CardSection>

          <CardSection title="TEMA DAN TAMPILAN" icon={Paintbrush}>
            {/* 🎨 Isi dengan opsi tema Ratu di sini */}
            <p className="text-sm font-bold text-neutral/70">
              Pilihan tema istana akan muncul di sini segera! ✨
            </p>
          </CardSection>
          <div className="bg-white border-3 border-[#2D2A2A] rounded-2xl shadow-[6px_6px_0px_#2D2A2A] overflow-hidden">
            <div className="bg-[#FAF9F5] border-b-3 border-[#2D2A2A] px-6 py-4 flex items-center gap-2 font-black text-base text-[#2D2A2A]">
              <Tag className="w-5 h-5 text-[#2D2A2A]" />
              <span>KELOLA KATEGORI DIARY</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Kategori baru... (misal: Steaks, Street Food)"
                  className="flex-1 px-4 py-3 bg-white border-2 border-[#2D2A2A] rounded-xl text-sm font-bold focus:outline-none focus:bg-amber-50/50"
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-[#C3E6CB] border-2 border-[#2D2A2A] text-[#2D2A2A] font-black text-sm rounded-xl shadow-[3px_3px_0px_#2D2A2A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D2A2A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  TAMBAH
                </button>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black uppercase text-slate-400 tracking-wider">
                  Kategori Saat Ini ({categories.length})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 border-2 border-[#2D2A2A] rounded-xl shadow-[2px_2px_0px_#2D2A2A] bg-white transition-transform hover:-translate-y-[1px]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 border-2 border-[#2D2A2A] rounded-md shadow-[1px_1px_0px_#2D2A2A]"
                          style={{ backgroundColor: cat.color }}
                        />
                        <div>
                          <p className="font-black text-sm text-[#2D2A2A]">
                            {cat.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400">
                            {cat.count} catatan ulasan
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-all"
                        title={`Hapus kategori ${cat.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-3 border-[#2D2A2A] rounded-2xl shadow-[6px_6px_0px_#2D2A2A] overflow-hidden">
            <div className="bg-[#FAF9F5] border-b-3 border-[#2D2A2A] px-6 py-4 flex items-center gap-2 font-black text-base text-[#2D2A2A]">
              <Paintbrush className="w-5 h-5 text-[#2D2A2A]" />
              <span>TEMA DAN TAMPILAN</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setTheme("pastel-cream")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    theme === "pastel-cream"
                      ? "bg-[#FAF9F5] border-[#2D2A2A] shadow-[3px_3px_0px_#2D2A2A] ring-2 ring-[#99D9EA]"
                      : "bg-white border-slate-200 hover:border-[#2D2A2A]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-xs text-[#2D2A2A]">
                      Pastel Cream 📜
                    </span>
                    {theme === "pastel-cream" && (
                      <Check className="w-4 h-4 text-[#2D2A2A] stroke-[3]" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 w-3 h-3 bg-[#FAF9F5] border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-[#99D9EA] border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-[#C3E6CB] border border-neutral rounded-xs" />
                  </div>
                </button>

                <button
                  onClick={() => setTheme("retro-bold")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    theme === "retro-bold"
                      ? "bg-[#FDF2B5] border-[#2D2A2A] shadow-[3px_3px_0px_#2D2A2A] ring-2 ring-[#99D9EA]"
                      : "bg-white border-slate-200 hover:border-[#2D2A2A]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-xs text-[#2D2A2A]">
                      Vintage Yellow ☀️
                    </span>
                    {theme === "retro-bold" && (
                      <Check className="w-4 h-4 text-[#2D2A2A] stroke-[3]" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 w-3 h-3 bg-[#FDF2B5] border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-[#99D9EA] border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-white border border-neutral rounded-xs" />
                  </div>
                </button>

                <button
                  onClick={() => setTheme("monochrome")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    theme === "monochrome"
                      ? "bg-slate-100 border-[#2D2A2A] shadow-[3px_3px_0px_#2D2A2A] ring-2 ring-[#2D2A2A]"
                      : "bg-white border-slate-200 hover:border-[#2D2A2A]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-xs text-[#2D2A2A]">
                      Mono Comic 🏁
                    </span>
                    {theme === "monochrome" && (
                      <Check className="w-4 h-4 text-[#2D2A2A] stroke-[3]" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <div className="w-3 w-3 h-3 bg-white border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-slate-400 border border-neutral rounded-xs" />
                    <div className="w-3 w-3 h-3 bg-[#2D2A2A] border border-neutral rounded-xs" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-3 border-[#2D2A2A] rounded-2xl shadow-[6px_6px_0px_#2D2A2A] overflow-hidden">
            <div className="bg-[#FAF9F5] border-b-3 border-[#2D2A2A] px-6 py-4 flex items-center gap-2 font-black text-base text-[#2D2A2A]">
              <Bell className="w-5 h-5 text-[#2D2A2A]" />
              <span>SISTEM & PRIVASI</span>
            </div>

            <div className="p-6 space-y-4 font-bold text-sm text-[#2D2A2A]">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-slate-400" />
                  <span>Pengingat Catat Kuliner Harian</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-7 border-2 border-[#2D2A2A] rounded-full transition-colors relative focus:outline-none ${
                    notifications ? "bg-[#C3E6CB]" : "bg-slate-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white border-2 border-[#2D2A2A] rounded-full absolute top-[2px] transition-all ${
                      notifications ? "left-[22px] shadow-none" : "left-[2px]"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-2 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C3E6CB]" />
                  <span>Enkripsi Penyimpanan Lokal Browser</span>
                </div>
                <span className="text-xs bg-[#C3E6CB] border-2 border-[#2D2A2A] px-2 py-0.5 rounded-md font-black">
                  AKTIF 🔐
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button className="flex items-center gap-2 px-5 py-3 border-2 border-[#2D2A2A] bg-white rounded-xl font-bold text-xs shadow-[2px_2px_0px_#2D2A2A] hover:bg-slate-50 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reset Default
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#C3E6CB] border-3 border-[#2D2A2A] rounded-xl font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#2D2A2A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#2D2A2A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
              Simpan Konfigurasi 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
