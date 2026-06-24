// "use client";

// import CardBox from "@/components/CardBox";
// import {
//   ArrowRight,
//   BookOpen,
//   Coin,
//   CookingPot,
//   FilmReel,
//   FilmStrip,
//   Wallet,
// } from "@phosphor-icons/react";
// export default function WelcomeDashboard() {
//   // Data menu Pintasan Saku Utama
//   const features = [
//     {
//       title: "Foodie Diary",
//       description:
//         "Catat memori kuliner, resep eksperimen, & ulasan makanan favoritmu.",
//       path: "/food",
//       Icon: CookingPot,
//       color: "bg-[#C5E384]", // Hijau Kebun sesuai gambar referensi
//       iconBg: "bg-[#EAF4D3]",
//       iconColor: "text-emerald-800",
//     },
//     {
//       title: "Eunoia Wallet",
//       description:
//         "Pantau arus tabungan harian & anggaran jajan bulanan dengan imut.",
//       path: "/finance",
//       Icon: Wallet,
//       color: "bg-[#FFEEBB]", // Kuning Butter Pastel
//       iconBg: "bg-[#FFF1B5]",
//       iconColor: "text-amber-800",
//     },
//     {
//       title: "Ticket Stubs",
//       description:
//         "Simpan ulasan film, rating maraton serial, & potongan tiket bioskop.",
//       path: "/movie",
//       Icon: FilmStrip,
//       color: "bg-[#FFB7B2]", // Pink Pastel Stroberi
//       iconBg: "bg-[#FFE5E3]",
//       iconColor: "text-rose-800",
//     },
//   ];

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-10 pb-28">
//       {/* 👑 WELCOME HEADER CUTE */}
//       <header className="text-center mb-10 mt-2 relative">
//         <div className="absolute -top-4 left-10 animate-bounce text-[#FF7B9C]">
//           <CookingPot size={32} weight="fill" />
//         </div>
//         <h1 className="font-header text-4xl font-extrabold text-[#4A3E3D] tracking-wide drop-shadow-sm">
//           Hello, Welcome Back! 🏡
//         </h1>
//         <p className="font-body text-[#8A7A78] mt-2 text-base italic">
//           "Every day is a fresh page in your beautiful life journal."
//         </p>
//         <div className="absolute -bottom-2 right-12 text-[#C5E384] animate-pulse">
//           <CookingPot size={36} weight="duotone" />
//         </div>
//       </header>

//       {/* 🌿 PAPAN WORKSPACE UTAMA (BANNER KARTU) */}
//       <CardBox
//         color="bg-white"
//         rounded="3xl"
//         shadowSize="lg"
//         className="mb-8 overflow-hidden"
//       >
//         {/* Atasan Banner ala Toko/Kebun */}
//         <div className="bg-[#C5E384] p-4 border-b-4 border-neutral text-center relative">
//           {/* Efek Garis Kotak-Kotak Tipis Dekoratif */}
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
//           <h2 className="font-header text-2xl font-bold text-[#4A3E3D] tracking-wide flex items-center justify-center gap-2">
//             <BookOpen size={28} weight="bold" /> Eunoia Workspace
//           </h2>
//         </div>

//         {/* Konten Banner */}
//         <div className="p-6 bg-[#FFFDF6] space-y-5 text-center">
//           <p className="font-body text-base text-[#4A3E3D] leading-relaxed max-w-md mx-auto">
//             Mau isi buku harian apa hari ini? Pilih salah satu kantong menu di
//             bawah untuk mulai mencatat momen serumu!
//           </p>

//           {/* Status Mini Ringkasan */}
//           <div className="grid grid-cols-3 gap-3 pt-2">
//             <div className="p-3 bg-white border-2 border-dashed border-[#C5E384] rounded-2xl flex flex-col items-center justify-center">
//               <CookingPot
//                 size={26}
//                 weight="fill"
//                 className="text-emerald-700 mb-1"
//               />
//               <span className="font-header text-xs font-bold text-[#4A3E3D]">
//                 Food Log
//               </span>
//             </div>
//             <div className="p-3 bg-white border-2 border-dashed border-[#FFEEBB] rounded-2xl flex flex-col items-center justify-center">
//               <Coin size={26} weight="fill" className="text-amber-600 mb-1" />
//               <span className="font-header text-xs font-bold text-[#4A3E3D]">
//                 Safe Wallet
//               </span>
//             </div>
//             <div className="p-3 bg-white border-2 border-dashed border-[#FFB7B2] rounded-2xl flex flex-col items-center justify-center">
//               <FilmReel
//                 size={26}
//                 weight="fill"
//                 className="text-rose-600 mb-1"
//               />
//               <span className="font-header text-xs font-bold text-[#4A3E3D]">
//                 Watched
//               </span>
//             </div>
//           </div>
//         </div>
//       </CardBox>

//       {/* 🗂️ GRID MENU UTAMA (Saku Navigasi Besar) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {features.map((feature) => {
//           const FeatureIcon = feature.Icon;

//           return (
//             <CardBox
//               key={feature.path}
//               href={feature.path}
//               color="bg-white"
//               rounded="3xl"
//               shadowSize="md"
//               className="group overflow-hidden flex flex-col justify-between"
//             >
//               <div>
//                 {/* Judul Kartu & Latar Belakang Khas */}
//                 <div
//                   className={`${feature.color} p-4 border-b-4 border-neutral flex items-center justify-between`}
//                 >
//                   <h3 className="font-header text-xl font-bold text-[#4A3E3D]">
//                     {feature.title}
//                   </h3>
//                   <div
//                     className={`${feature.iconBg} ${feature.iconColor} p-2 rounded-xl border-2 border-neutral shadow-[2px_2px_0px_#4A3E3D] group-hover:scale-110 transition-transform`}
//                   >
//                     <FeatureIcon size={22} weight="bold" />
//                   </div>
//                 </div>

//                 {/* Deskripsi Menu */}
//                 <div className="p-5 bg-[#FFFDF6]">
//                   <p className="font-body text-sm text-[#4A3E3D]/90 leading-relaxed text-left">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Tombol Aksi di Kaki Kartu */}
//               <div className="px-5 pb-4 bg-[#FFFDF6] flex justify-end">
//                 <span className="inline-flex items-center gap-1 text-xs font-bold font-header px-3 py-1.5 bg-white border-2 border-neutral rounded-xl group-hover:bg-neutral group-hover:text-white transition-colors shadow-[2px_2px_0px_#4A3E3D] group-hover:shadow-none group-hover:translate-y-0.5">
//                   Buka Pintu <ArrowRight size={14} weight="bold" />
//                 </span>
//               </div>
//             </CardBox>
//           );
//         })}
//       </div>

//       {/* FOOTER MINI AESTHETIC */}
//       <footer className="text-center mt-14 text-xs font-body text-[#8A7A78]/70 italic">
//         Eunoia Shell v2.5 • Crafted with love and pastel codes 🧸
//       </footer>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckSquare,
  Square,
  Sun,
  Moon,
  CalendarBlank,
  Plus,
  Heart,
  CookingPot,
  Wallet,
  FilmStrip,
  BookOpen,
  Plant,
  Flower,
  YoutubeLogo,
} from "@phosphor-icons/react";
import CardBox from "@/components/CardBox";

export default function CozyNotionDashboard() {
  // State sederhana untuk checklist Morning Routine agar bisa dicentang
  const [routines, setRoutines] = useState([
    { id: 1, text: "Drink water 💧", checked: true },
    { id: 2, text: "Feed the cats 🐾", checked: false },
    { id: 3, text: "Water the plants 🌿", checked: false },
    { id: 4, text: "Skincare routine ✨", checked: true },
    { id: 5, text: "Eat breakfast 🥞", checked: false },
    { id: 6, text: "Pack lunchbox 🍱", checked: false },
  ]);

  const toggleRoutine = (id: number) => {
    setRoutines(
      routines.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r)),
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7EB] text-[#4A5742] p-4 sm:p-8 pb-24 font-body bg-cute-grid">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ================= 👑 LEFT SIDEBAR (3 Columns wide) ================= */}
        <aside className="md:col-span-4 space-y-6">
          {/* ⏰ Digital Clock Card */}
          <CardBox
            color="bg-[#4A5742] text-[#FFFDF6]"
            rounded="2xl"
            shadowSize="sm"
            className="p-4 text-center"
          >
            <span className="font-header text-3xl font-black tracking-widest block">
              02:02
            </span>
            <span className="text-xs uppercase tracking-wider opacity-80">
              Stay Cozy, Stay Mindful
            </span>
          </CardBox>

          {/* ☀️ Morning Routine Checklist */}
          <CardBox
            color="bg-[#FFFDF6]"
            rounded="3xl"
            shadowSize="md"
            className="p-5"
          >
            <h3 className="font-header text-lg font-bold border-b-2 border-dashed border-[#4A5742]/30 pb-2 mb-4 flex items-center gap-2">
              <Sun size={20} weight="fill" className="text-amber-500" /> Morning
              Routine
            </h3>
            <div className="space-y-3">
              {routines.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  <span
                    className={item.checked ? "line-through opacity-50" : ""}
                  >
                    {item.text}
                  </span>
                  {item.checked ? (
                    <CheckSquare
                      size={20}
                      weight="fill"
                      className="text-[#A2BA96]"
                    />
                  ) : (
                    <Square
                      size={20}
                      weight="bold"
                      className="text-[#4A5742]/50"
                    />
                  )}
                </button>
              ))}
            </div>
          </CardBox>

          {/* 🌸 Cute Illustration Space */}
          <CardBox
            color="bg-[#D1E2C9]"
            rounded="3xl"
            shadowSize="md"
            className="p-5 text-center flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-[#4A5742]/20">
              <Heart size={48} weight="fill" />
            </div>
            <Plant
              size={54}
              weight="duotone"
              className="text-[#4A5742] animate-bounce"
            />
            <p className="text-xs font-bold mt-3 max-w-[150px] leading-relaxed">
              "Grow at your own beautiful pace."
            </p>
          </CardBox>

          {/* 🌼 Mini Gallery Grid */}
          <CardBox
            color="bg-[#FFFDF6]"
            rounded="3xl"
            shadowSize="md"
            className="p-4"
          >
            <span className="text-xs font-bold opacity-60 block mb-2 uppercase tracking-wider">
              Make as Gallery
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#E6ECD8] border-2 border-[#4A5742] rounded-xl flex items-center justify-center"
                >
                  <Flower
                    size={24}
                    weight="fill"
                    className="text-[#A2BA96] animate-pulse"
                  />
                </div>
              ))}
            </div>
          </CardBox>

          {/* 📹 YouTube Playlist Embed Simulation */}
          <CardBox
            color="bg-[#C2D8B9]"
            rounded="3xl"
            shadowSize="sm"
            className="p-4 flex flex-col justify-between gap-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold bg-[#4A5742] text-white px-2 py-1 rounded-lg w-max">
              <YoutubeLogo size={16} weight="fill" /> Lofi Beats
            </div>
            <div className="bg-[#FFFDF6] border-2 border-[#4A5742] rounded-xl p-3 text-center text-xs font-bold shadow-[2px_2px_0px_rgba(74,62,61,1)]">
              🎵 Code & Chill Playlist
            </div>
          </CardBox>
        </aside>

        {/* ================= 🌿 RIGHT MAIN HUB (8 Columns wide) ================= */}
        <main className="md:col-span-8 space-y-6">
          {/* 🥬 Big Welcome Header (Caby The Cabbage Style) */}
          <div className="bg-[#C2D8B9] border-4 border-[#4A5742] rounded-[32px] p-6 text-center relative shadow-[6px_6px_0px_rgba(74,62,61,1)] overflow-hidden">
            {/* Awan-awan lucu hiasan */}
            <div className="absolute top-4 left-6 text-white/40 text-xl animate-pulse">
              ☁️
            </div>
            <div className="absolute bottom-4 right-8 text-white/40 text-2xl animate-pulse">
              ☁️
            </div>

            <span className="bg-[#FFFDF6] border-2 border-[#4A5742] text-xs font-black uppercase px-4 py-1 rounded-full shadow-[2px_2px_0px_rgba(74,62,61,1)]">
              This is what you can do!
            </span>
            <h1 className="font-header text-4xl sm:text-5xl font-black text-[#4A5742] tracking-tight mt-3 mb-1 flex items-center justify-center gap-2">
              🌿 Eunoia Hub 🌿
            </h1>
          </div>

          {/* 🗂️ PRE-MADE SUB-PAGES QUICK LINKS (Top Row 3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Foodie Diary",
                path: "/food",
                icon: CookingPot,
                bg: "bg-[#FFF1B5]",
              },
              {
                title: "Eunoia Wallet",
                path: "/finance",
                icon: Wallet,
                bg: "bg-[#EAF4D3]",
              },
              {
                title: "Ticket Stubs",
                path: "/movie",
                icon: FilmStrip,
                bg: "bg-[#FFE5E3]",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <CardBox
                  key={i}
                  href={card.path}
                  color={card.bg}
                  rounded="2xl"
                  shadowSize="sm"
                  className="p-4 text-center group"
                >
                  <div className="w-12 h-12 mx-auto bg-[#FFFDF6] border-2 border-[#4A5742] rounded-xl flex items-center justify-center mb-2 shadow-[2px_2px_0px_rgba(74,62,61,1)] group-hover:scale-110 transition-transform">
                    <Icon size={24} weight="fill" className="text-[#4A5742]" />
                  </div>
                  <span className="font-header text-sm font-bold block">
                    {card.title}
                  </span>
                </CardBox>
              );
            })}
          </div>

          {/* ➕ RECORD & QUICK ADD AREA */}
          <CardBox
            color="bg-[#FFFDF6]"
            rounded="3xl"
            shadowSize="md"
            className="p-5"
          >
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#4A5742]/30 pb-3 mb-4">
              <h3 className="font-header text-base font-bold uppercase tracking-wider">
                Record & Quick Actions
              </h3>
              <button className="w-8 h-8 bg-[#C2D8B9] border-2 border-[#4A5742] rounded-full flex items-center justify-center shadow-[2px_2px_0px_rgba(74,62,61,1)] hover:translate-y-0.5 active:shadow-none transition-all">
                <Plus size={16} weight="bold" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold">
              <div className="p-3 bg-[#F4F7EB] border-2 border-[#4A5742] rounded-xl">
                🥗 Subjects
              </div>
              <div className="p-3 bg-[#F4F7EB] border-2 border-[#4A5742] rounded-xl">
                📚 Reading List
              </div>
              <div className="p-3 bg-[#F4F7EB] border-2 border-[#4A5742] rounded-xl">
                ✨ Vision & Goals
              </div>
              <div className="p-3 bg-[#F4F7EB] border-2 border-[#4A5742] rounded-xl">
                🧸 Wishlist
              </div>
            </div>
          </CardBox>

          {/* 🔑 SECRETS AREA (Aniversary / Important Dates) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <CardBox
              color="bg-[#FFFDF6]"
              rounded="3xl"
              shadowSize="md"
              className="p-5 sm:col-span-7 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-header text-sm font-black uppercase tracking-widest text-[#FFFDF6] bg-[#4A5742] px-3 py-1 rounded-md w-max mb-4">
                  🔒 Secrets Area!
                </h4>
                <div className="space-y-2 text-xs font-bold text-[#4A5742]/90">
                  <div className="flex justify-between border-b border-[#4A5742]/10 pb-1">
                    <span>🎂 Project Anniversary</span>{" "}
                    <span className="text-amber-600">Jan 15 🥞</span>
                  </div>
                  <div className="flex justify-between border-b border-[#4A5742]/10 pb-1">
                    <span>🚀 First Launch Day</span>{" "}
                    <span className="text-emerald-600">Feb 20 🌿</span>
                  </div>
                  <div className="flex justify-between border-b border-[#4A5742]/10 pb-1">
                    <span>💖 Upgrade Shell v2</span>{" "}
                    <span className="text-rose-500">Apr 25 ❤️</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🦷 Dentist Appt.</span>{" "}
                    <span className="text-blue-500">May 05 🩺</span>
                  </div>
                </div>
              </div>
            </CardBox>

            {/* 🌙 Checkbox Tambahan Kanan Mini */}
            <CardBox
              color="bg-[#EAF4D3]"
              rounded="3xl"
              shadowSize="md"
              className="p-5 sm:col-span-5"
            >
              <div className="text-center mb-3 text-xl">
                <Moon
                  size={28}
                  weight="fill"
                  className="mx-auto text-indigo-900"
                />
              </div>
              <div className="space-y-2 text-xs font-bold">
                <label className="flex items-center gap-2 opacity-80">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-xs checkbox-neutral"
                  />{" "}
                  Clean the kitchen
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-neutral"
                  />{" "}
                  Drink green tea
                </label>
                <label className="flex items-center gap-2 opacity-80">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-xs checkbox-neutral"
                  />{" "}
                  Task for dreams
                </label>
              </div>
            </CardBox>
          </div>

          {/* 📅 WEEKLY TRACKER / MINI CALENDAR BAR */}
          <CardBox
            color="bg-[#FFFDF6]"
            rounded="3xl"
            shadowSize="md"
            className="p-4"
          >
            <div className="grid grid-cols-7 gap-1 text-center font-header text-xs font-bold border-b-2 border-[#4A5742] pb-1 mb-2">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span className="text-emerald-700">SAT</span>
              <span className="text-emerald-700">SUN</span>
            </div>
            <div className="grid grid-cols-7 gap-1 h-12">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`border border-dashed border-[#4A5742]/30 rounded-lg flex flex-col justify-between p-1 text-[10px] font-bold ${i === 2 ? "bg-[#FFEEBB]" : ""}`}
                >
                  <span></span>
                  {i === 2 && (
                    <span className="bg-[#4A5742] text-white text-[8px] px-0.5 rounded truncate text-center">
                      Meeting
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardBox>
        </main>
      </div>
    </div>
  );
}
