"use client";

import React, { useEffect, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "./IconRenderer";

import { CalendarDataMap, DayData } from "../types/calendar";

interface UniversalCalendarProps {
  data?: CalendarDataMap;
  title?: string;
  onDateClick?: (dateStr: string, dayData?: DayData) => void;
  legends?: { label: string; color: string }[];
}

export default function UniversalCalendar({
  data = {},
  title = "Calendar",
  onDateClick,
  legends = [
    { label: "Income", color: "bg-emerald-500" },
    { label: "Expense", color: "bg-rose-500" },
    { label: "Today", color: "bg-neutral-400" },
  ],
}: UniversalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Default Juli 2026
  const todayStr = new Date().toISOString().split("T")[0];

  // State untuk tanggal yang dipilih (default ke hari ini atau tanggal 1 bulan aktif)
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  // State khusus modal untuk versi mobile
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Pastikan saat bulan berganti, selectedDateStr ikut menyesuaikan ke tanggal 1 bulan tersebut jika tgl sebelumnya tidak ada
  useEffect(() => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const firstDayOfMonth = `${year}-${formattedMonth}-01`;
    setSelectedDateStr(firstDayOfMonth);
  }, [currentDate]);

  const handleCellClick = (dayNum: number) => {
    const formattedDay = String(dayNum).padStart(2, "0");
    const formattedMonth = String(month + 1).padStart(2, "0");
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    setSelectedDateStr(dateStr);

    // Jika di layar mobile (< 768px), buka modal popup
    if (window.innerWidth < 768) {
      setIsMobileModalOpen(true);
    }

    const dayData = data[dateStr];
    if (onDateClick) onDateClick(dateStr, dayData);
  };

  // Objek data untuk tanggal yang sedang dipilih
  const selectedDateObj = new Date(selectedDateStr + "T00:00:00");
  const selectedDayData = data[selectedDateStr];

  return (
    <div className="w-full flex flex-col gap-3">
      {title && <h2 className="text-xl font-black uppercase">{title}</h2>}

      {/* Layout Responsif: Grid 1 kolom di mobile, 12 kolom bersampingan di desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Kalender (Mengambil 7 kolom di desktop) */}
        <div className="md:col-span-7 w-full">
          <CardBox
            color="base-100"
            rounded="3xl"
            className="p-4 sm:p-5 flex flex-col gap-4 border-4"
          >
            {/* Header Navigation */}
            <div className="bg-purple-300 border-2 border-black rounded-2xl p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={prevMonth}
                className="w-9 h-9 bg-white border-2 border-black rounded-xl flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <span className="font-black text-lg sm:text-xl text-neutral">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="w-9 h-9 bg-white border-2 border-black rounded-xl flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>

            {/* Day Names Row */}
            <div className="grid grid-cols-7 text-center font-black text-neutral/60 text-sm">
              {dayLabels.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-14 sm:h-16" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const formattedDay = String(dayNum).padStart(2, "0");
                const formattedMonth = String(month + 1).padStart(2, "0");
                const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

                const dayData = data[dateStr];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDateStr;

                let bgStyle = "bg-neutral-50/50 hover:bg-neutral-100";
                let borderStyle = "border-transparent";

                if (dayData?.badgeType === "income") {
                  bgStyle = "bg-emerald-100/70 border-2 border-black";
                } else if (dayData?.badgeType === "expense") {
                  bgStyle = "bg-rose-100/70 border-0";
                } else if (dayData?.badgeType === "neutral") {
                  bgStyle = "bg-amber-200 border-2 border-black";
                }

                if (isSelected) {
                  borderStyle =
                    "border-2 border-purple-600 ring-2 ring-purple-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                } else if (isToday) {
                  borderStyle = "border-2 border-neutral-800";
                }

                return (
                  <button
                    key={dayNum}
                    onClick={() => handleCellClick(dayNum)}
                    className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer ${bgStyle} ${borderStyle} active:scale-95`}
                  >
                    <span className="font-black text-sm text-neutral">
                      {dayNum}
                    </span>

                    {dayData?.badgeText ? (
                      <span
                        className={`text-[10px] font-black leading-none ${
                          dayData.badgeType === "income"
                            ? "text-emerald-700"
                            : dayData.badgeType === "expense"
                              ? "text-rose-600"
                              : "text-neutral-800"
                        }`}
                      >
                        {dayData.badgeText}
                      </span>
                    ) : (
                      <span />
                    )}

                    <div className="flex gap-1 items-center h-2">
                      {dayData?.hasIncome && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                      {dayData?.hasExpense && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      )}
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-2 px-1 text-xs font-bold text-neutral">
              {legends.map((leg, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${leg.color}`} />
                  <span>{leg.label}</span>
                </div>
              ))}
            </div>
          </CardBox>
        </div>

        {/* Kolom Kanan: Detail Transaksi (Hanya tampil langsung di layar Desktop md+) */}
        <div className="hidden md:block md:col-span-5 w-full">
          <CardBox
            color="base-100"
            rounded="3xl"
            className="p-5 flex flex-col gap-4 border-4 sticky top-6 min-h-115"
          >
            <div className="flex justify-between items-start pb-2 border-b-2 border-black/10">
              <div>
                <span className="text-caption font-bold uppercase tracking-widest text-base-content/60 block mb-0.5">
                  Selected Date Details
                </span>
                <h3 className="font-black text-lg text-neutral">
                  {isNaN(selectedDateObj.getTime())
                    ? "Select a date"
                    : selectedDateObj.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                </h3>
              </div>
            </div>

            {/* Summary Boxes */}
            {selectedDayData?.summary && (
              <div className="grid grid-cols-2 gap-3">
                {selectedDayData.summary.incomeTotal !== undefined &&
                  selectedDayData.summary.incomeTotal > 0 && (
                    <div className="p-3 bg-emerald-100 border-2 border-black rounded-2xl flex flex-col shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-xs font-bold opacity-70">
                        Income
                      </span>
                      <span className="font-black text-sm text-emerald-800">
                        Rp{" "}
                        {selectedDayData.summary.incomeTotal.toLocaleString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                  )}

                {selectedDayData.summary.expenseTotal !== undefined &&
                  selectedDayData.summary.expenseTotal > 0 && (
                    <div className="p-3 bg-rose-100 border-2 border-black rounded-2xl flex flex-col shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-xs font-bold opacity-70">
                        Expense
                      </span>
                      <span className="font-black text-sm text-rose-800">
                        Rp{" "}
                        {selectedDayData.summary.expenseTotal.toLocaleString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                  )}
              </div>
            )}

            {/* List Item / Transaksi pada Tanggal Tersebut */}
            <div className="flex flex-col gap-3 max-h-85 overflow-y-auto pr-1">
              {selectedDayData?.items && selectedDayData.items.length > 0 ? (
                selectedDayData.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white border-2 border-black rounded-2xl flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        style={{ backgroundColor: item.color || "#fde047" }}
                      >
                        <IconRenderer
                          name={item.iconSlug || "Briefcase"}
                          size={18}
                          weight="bold"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="font-black text-xs truncate text-neutral">
                          {item.title}
                        </p>
                        {item.badges && item.badges.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-0.5">
                            {item.badges.map((b, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.2 bg-neutral-100 text-[9px] font-bold rounded border border-neutral-300"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.amount && (
                      <span
                        className={`font-black text-xs shrink-0 ${
                          item.type === "income"
                            ? "text-emerald-600"
                            : item.type === "expense"
                              ? "text-rose-600"
                              : "text-neutral"
                        }`}
                      >
                        {item.type === "income"
                          ? "+"
                          : item.type === "expense"
                            ? "-"
                            : ""}
                        {typeof item.amount === "number"
                          ? `Rp ${item.amount.toLocaleString("id-ID")}`
                          : `Rp ${Number(item.amount || 0).toLocaleString("id-ID")}`}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                  <p className="text-sm font-bold text-neutral/50">
                    No transactions on this date.
                  </p>
                </div>
              )}
            </div>
          </CardBox>
        </div>
      </div>

      {/* Modal Khusus Tampilan Mobile (< 768px) */}
      {isMobileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200"
          onClick={() => setIsMobileModalOpen(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardBox
              className="max-h-[80vh] overflow-y-auto p-5 flex flex-col gap-4 border-4"
              rounded="2xl"
              color="base-100"
            >
              <div className="flex justify-between items-start mb-1 gap-4">
                <div>
                  <span className="text-caption font-bold uppercase tracking-widest text-base-content/60 block mb-0.5">
                    Calendar Details
                  </span>
                  <h3 className="font-black text-base text-neutral">
                    {selectedDateObj.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileModalOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 border-2 border-black text-base-content hover:bg-base-300 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Summary Mobile */}
              {selectedDayData?.summary && (
                <div className="grid grid-cols-2 gap-3">
                  {selectedDayData.summary.incomeTotal !== undefined &&
                    selectedDayData.summary.incomeTotal > 0 && (
                      <div className="p-3 bg-emerald-100 border-2 border-black rounded-2xl flex flex-col shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs font-bold opacity-70">
                          Income
                        </span>
                        <span className="font-black text-sm text-emerald-800">
                          Rp{" "}
                          {selectedDayData.summary.incomeTotal.toLocaleString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    )}

                  {selectedDayData.summary.expenseTotal !== undefined &&
                    selectedDayData.summary.expenseTotal > 0 && (
                      <div className="p-3 bg-rose-100 border-2 border-black rounded-2xl flex flex-col shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs font-bold opacity-70">
                          Expense
                        </span>
                        <span className="font-black text-sm text-rose-800">
                          Rp{" "}
                          {selectedDayData.summary.expenseTotal.toLocaleString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    )}
                </div>
              )}

              {/* List Item Mobile */}
              <div className="flex flex-col gap-3 mt-1">
                {selectedDayData?.items && selectedDayData.items.length > 0 ? (
                  selectedDayData.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white border-2 border-black rounded-2xl flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                          style={{ backgroundColor: item.color || "#fde047" }}
                        >
                          <IconRenderer
                            name={item.iconSlug || "Briefcase"}
                            size={18}
                            weight="bold"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="font-black text-xs truncate text-neutral">
                            {item.title}
                          </p>
                          {item.badges && item.badges.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-0.5">
                              {item.badges.map((b, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.2 bg-neutral-100 text-[9px] font-bold rounded border border-neutral-300"
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {item.amount && (
                        <span
                          className={`font-black text-xs shrink-0 ${
                            item.type === "income"
                              ? "text-emerald-600"
                              : item.type === "expense"
                                ? "text-rose-600"
                                : "text-neutral"
                          }`}
                        >
                          {item.type === "income"
                            ? "+"
                            : item.type === "expense"
                              ? "-"
                              : ""}
                          {typeof item.amount === "number"
                            ? `Rp ${item.amount.toLocaleString("id-ID")}`
                            : `Rp ${Number(item.amount || 0).toLocaleString("id-ID")}`}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <p className="text-sm font-bold text-neutral/50">
                      No activities logged on this date.
                    </p>
                  </div>
                )}
              </div>
            </CardBox>
          </div>
        </div>
      )}
    </div>
  );
}
