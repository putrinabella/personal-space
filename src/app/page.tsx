"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  Square,
  Sun,
  Moon,
  Plus,
  Heart,
  CookingPot,
  Wallet,
  FilmStrip,
  Plant,
  Flower,
  YoutubeLogo,
  Drop,
  Cat,
  Sparkle,
  Cake,
  Rocket,
  Tooth,
  Briefcase,
  BookOpen,
  Target,
  Gift,
} from "@phosphor-icons/react";
import CardBox from "@/components/CardBox";

export default function CozyNotionDashboard() {
  // State interaktif untuk checklist Morning Routine harian
  const [routines, setRoutines] = useState([
    {
      id: 1,
      text: "Drink water",
      icon: Drop,
      iconColor: "text-info",
      checked: true,
    },
    {
      id: 2,
      text: "Feed the cats",
      icon: Cat,
      iconColor: "text-warning",
      checked: false,
    },
    {
      id: 3,
      text: "Water the plants",
      icon: Plant,
      iconColor: "text-success",
      checked: false,
    },
    {
      id: 4,
      text: "Skincare routine",
      icon: Sparkle,
      iconColor: "text-error",
      checked: true,
    },
    {
      id: 5,
      text: "Eat breakfast",
      icon: CookingPot,
      iconColor: "text-warning",
      checked: false,
    },
    {
      id: 6,
      text: "Pack lunchbox",
      icon: Briefcase,
      iconColor: "text-neutral",
      checked: false,
    },
  ]);

  const toggleRoutine = (id: number) => {
    setRoutines(
      routines.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r)),
    );
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-4 sm:p-8 pb-24 font-body bg-cute-grid">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ================= 👑 LEFT SIDEBAR (3 Columns wide) ================= */}
        <aside className="md:col-span-4 space-y-6">
          {/* ⏰ Digital Clock Card */}
          <CardBox
            color="bg-neutral text-base-100"
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
            color="bg-base-100 border border-neutral/20"
            rounded="3xl"
            shadowSize="md"
            className="p-5"
          >
            <h3 className="font-header text-lg font-bold border-b-2 border-dashed border-neutral/30 pb-2 mb-4 flex items-center gap-2">
              <Sun size={20} weight="fill" className="text-warning" /> Morning
              Routine
            </h3>
            <div className="space-y-3">
              {routines.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleRoutine(item.id)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    <span
                      className={`flex items-center gap-2 ${item.checked ? "line-through opacity-40 italic" : ""}`}
                    >
                      <ItemIcon
                        size={16}
                        weight="fill"
                        className={item.checked ? "opacity-40" : item.iconColor}
                      />
                      {item.text}
                    </span>
                    {item.checked ? (
                      <CheckSquare
                        size={20}
                        weight="fill"
                        className="text-primary"
                      />
                    ) : (
                      <Square
                        size={20}
                        weight="bold"
                        className="text-neutral/40"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </CardBox>

          {/* 🌸 Cute Illustration Space */}
          <CardBox
            color="bg-base-200"
            rounded="3xl"
            shadowSize="md"
            className="p-5 text-center flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-neutral/10">
              <Heart size={48} weight="fill" />
            </div>
            <Plant
              size={54}
              weight="duotone"
              className="text-neutral animate-bounce"
            />
            <p className="text-xs font-bold mt-3 max-w-[150px] leading-relaxed">
              "Grow at your own beautiful pace."
            </p>
          </CardBox>

          {/* 🌼 Mini Gallery Grid */}
          <CardBox
            color="bg-base-100 border border-neutral/20"
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
                  className="aspect-square bg-base-100 border-2 border-neutral rounded-xl flex items-center justify-center shadow-[2px_2px_0px_var(--color-neutral)]"
                >
                  <Flower
                    size={24}
                    weight="fill"
                    className="text-primary animate-pulse"
                  />
                </div>
              ))}
            </div>
          </CardBox>

          {/* 📹 YouTube Playlist Embed Simulation */}
          <CardBox
            color="bg-secondary"
            rounded="3xl"
            shadowSize="sm"
            className="p-4 flex flex-col justify-between gap-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold bg-neutral text-base-100 px-2 py-1 rounded-lg w-max">
              <YoutubeLogo size={16} weight="fill" /> Lofi Beats
            </div>
            <div className="bg-base-100 border-2 border-neutral rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold shadow-[2px_2px_0px_var(--color-neutral)]">
              <YoutubeLogo size={16} weight="bold" className="text-neutral" />{" "}
              Code & Chill Playlist
            </div>
          </CardBox>
        </aside>

        {/* ================= 🌿 RIGHT MAIN HUB (8 Columns wide) ================= */}
        <main className="md:col-span-8 space-y-6">
          {/* 🥬 Big Welcome Header (Caby The Cabbage Style) */}
          <div className="bg-primary text-primary-content border-4 border-neutral rounded-[32px] p-6 text-center relative shadow-[6px_6px_0px_var(--color-neutral)] overflow-hidden">
            <div className="absolute top-4 left-6 text-neutral/10 animate-pulse">
              <Sparkle size={24} weight="fill" />
            </div>
            <div className="absolute bottom-4 right-8 text-neutral/10 animate-pulse">
              <Sparkle size={28} weight="fill" />
            </div>

            <span className="bg-base-100 border-2 border-neutral text-neutral text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-[2px_2px_0px_var(--color-neutral)]">
              This is what you can do!
            </span>
            <h1 className="font-header text-4xl sm:text-5xl font-black text-neutral tracking-tight mt-3 mb-1 flex items-center justify-center gap-2">
              <Plant size={40} weight="fill" /> Eunoia Hub{" "}
              <Plant size={40} weight="fill" />
            </h1>
          </div>

          {/* 🗂️ PRE-MADE SUB-PAGES QUICK LINKS (Top Row 3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Foodie Diary",
                path: "/food",
                icon: CookingPot,
                bg: "bg-base-100 border border-neutral/20",
              },
              {
                title: "Eunoia Wallet",
                path: "/finance",
                icon: Wallet,
                bg: "bg-base-100 border border-neutral/20",
              },
              {
                title: "Ticket Stubs",
                path: "/movie",
                icon: FilmStrip,
                bg: "bg-base-100 border border-neutral/20",
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
                  <div className="w-12 h-12 mx-auto bg-base-200 border-2 border-neutral rounded-xl flex items-center justify-center mb-2 shadow-[2px_2px_0px_var(--color-neutral)] group-hover:scale-110 transition-transform">
                    <Icon size={24} weight="fill" className="text-neutral" />
                  </div>
                  <span className="font-header text-sm font-bold block text-base-content">
                    {card.title}
                  </span>
                </CardBox>
              );
            })}
          </div>

          {/* ➕ RECORD & QUICK ADD AREA */}
          <CardBox
            color="bg-base-100 border border-neutral/20"
            rounded="3xl"
            shadowSize="md"
            className="p-5"
          >
            <div className="flex items-center justify-between border-b-2 border-dashed border-neutral/20 pb-3 mb-4">
              <h3 className="font-header text-base font-bold uppercase tracking-wider">
                Record & Quick Actions
              </h3>
              <button className="w-8 h-8 bg-primary border-2 border-neutral text-primary-content rounded-full flex items-center justify-center shadow-[2px_2px_0px_var(--color-neutral)] hover:translate-y-0.5 active:shadow-none transition-all">
                <Plus size={16} weight="bold" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold">
              <div className="p-3 bg-base-100 border-2 border-base-300 rounded-xl shadow-[2px_2px_0px_var(--color-neutral)] flex items-center justify-center gap-1.5 text-base-content">
                <Plant size={14} weight="fill" className="text-success" />{" "}
                Subjects
              </div>
              <div className="p-3 bg-base-100 border-2 border-base-300 rounded-xl shadow-[2px_2px_0px_var(--color-neutral)] flex items-center justify-center gap-1.5 text-base-content">
                <BookOpen size={14} weight="fill" className="text-warning" />{" "}
                Reading List
              </div>
              <div className="p-3 bg-base-100 border-2 border-base-300 rounded-xl shadow-[2px_2px_0px_var(--color-neutral)] flex items-center justify-center gap-1.5 text-base-content">
                <Target size={14} weight="fill" className="text-accent" />{" "}
                Vision & Goals
              </div>
              <div className="p-3 bg-base-100 border-2 border-base-300 rounded-xl shadow-[2px_2px_0px_var(--color-neutral)] flex items-center justify-center gap-1.5 text-base-content">
                <Gift size={14} weight="fill" className="text-error" /> Wishlist
              </div>
            </div>
          </CardBox>

          {/* 🔑 SECRETS AREA & MINI CHECKBOX GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <CardBox
              color="bg-base-100 border border-neutral/20"
              rounded="3xl"
              shadowSize="md"
              className="p-5 sm:col-span-7 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-header text-sm font-black uppercase tracking-widest text-base-100 bg-neutral px-3 py-1 rounded-md w-max mb-4">
                  🔒 Secrets Area!
                </h4>
                <div className="space-y-2 text-xs font-bold text-base-content/90">
                  <div className="flex justify-between border-b border-neutral/10 pb-1 items-center">
                    <span className="flex items-center gap-1.5">
                      <Cake size={14} weight="fill" className="text-warning" />{" "}
                      Project Anniversary
                    </span>
                    <span className="text-warning font-black">Jan 15</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral/10 pb-1 items-center">
                    <span className="flex items-center gap-1.5">
                      <Rocket
                        size={14}
                        weight="fill"
                        className="text-success"
                      />{" "}
                      First Launch Day
                    </span>
                    <span className="text-success font-black">Feb 20</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral/10 pb-1 items-center">
                    <span className="flex items-center gap-1.5">
                      <Heart size={14} weight="fill" className="text-error" />{" "}
                      Upgrade Shell v2
                    </span>
                    <span className="text-error font-black">Apr 25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Tooth size={14} weight="fill" className="text-info" />{" "}
                      Dentist Appt.
                    </span>
                    <span className="text-info font-black">May 05</span>
                  </div>
                </div>
              </div>
            </CardBox>

            {/* 🌙 Checkbox Tambahan Kanan Mini */}
            <CardBox
              color="bg-base-200"
              rounded="3xl"
              shadowSize="md"
              className="p-5 sm:col-span-5"
            >
              <div className="text-center mb-3">
                <Moon
                  size={28}
                  weight="fill"
                  className="mx-auto text-neutral"
                />
              </div>
              <div className="space-y-2 text-xs font-bold text-base-content">
                <label className="flex items-center gap-2 opacity-70">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-xs checkbox-neutral border-neutral"
                  />
                  Clean the kitchen
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-neutral border-neutral"
                  />
                  Drink green tea
                </label>
                <label className="flex items-center gap-2 opacity-80">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-xs checkbox-neutral border-neutral"
                  />
                  Task for dreams
                </label>
              </div>
            </CardBox>
          </div>

          {/* 📅 WEEKLY TRACKER / MINI CALENDAR BAR */}
          <CardBox
            color="bg-base-100 border border-neutral/20"
            rounded="3xl"
            shadowSize="md"
            className="p-4"
          >
            <div className="grid grid-cols-7 gap-1 text-center font-header text-xs font-bold border-b-2 border-neutral pb-1 mb-2">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
            <div className="grid grid-cols-7 gap-1 h-12">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`border border-dashed border-neutral/30 rounded-lg flex flex-col justify-between p-1 text-[10px] font-bold ${i === 2 ? "bg-secondary" : ""}`}
                >
                  <span></span>
                  {i === 2 && (
                    <span className="bg-neutral text-base-100 text-[8px] px-0.5 rounded truncate text-center">
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
