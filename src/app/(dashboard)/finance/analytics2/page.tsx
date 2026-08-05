"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  PlusIcon,
  TrashIcon,
  CalendarBlank,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";

// Tipe data untuk Dummy Budget
interface BudgetWithProgress {
  id: string;
  categoryName: string;
  categoryIcon: string;
  color: string;
  amount: number;
  totalSpent: number;
  remaining: number;
  percentage: number;
  month: string;
  year: string;
}

export default function BudgetPage() {
  // State untuk filter bulan & tahun aktif (Default: Juli 2026)
  const [selectedMonth, setSelectedMonth] = useState("7");
  const [selectedYear] = useState("2026");

  // State Modal Form Tambah Budget
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: "cat-1",
    amount: "",
    month: "7",
    year: "2026",
  });

  // Data Dummy Budget berdasarkan kategori pengeluaran
  const [budgets, setBudgets] = useState<BudgetWithProgress[]>([
    {
      id: "b-1",
      categoryName: "Food & Drinks",
      categoryIcon: "🍔",
      color: "bg-success/20 text-success-content border-success",
      amount: 2500000,
      totalSpent: 1850000,
      remaining: 650000,
      percentage: 74,
      month: "7",
      year: "2026",
    },
    {
      id: "b-2",
      categoryName: "Transport & Fuel",
      categoryIcon: "🚗",
      color: "bg-warning/20 text-warning-content border-warning",
      amount: 1000000,
      totalSpent: 950000,
      remaining: 50000,
      percentage: 95,
      month: "7",
      year: "2026",
    },
    {
      id: "b-3",
      categoryName: "Shopping & Lifestyle",
      categoryIcon: "🛍️",
      color: "bg-error/20 text-error-content border-error",
      amount: 1200000,
      totalSpent: 1350000, // Melebihi budget
      remaining: -150000,
      percentage: 112.5,
      month: "7",
      year: "2026",
    },
    {
      id: "b-4",
      categoryName: "Utilities & Bills",
      categoryIcon: "💡",
      color: "bg-info/20 text-info-content border-info",
      amount: 800000,
      totalSpent: 400000,
      remaining: 400000,
      percentage: 50,
      month: "7",
      year: "2026",
    },
  ]);

  // Filter budget sesuai bulan & tahun yang dipilih
  const filteredBudgets = budgets.filter(
    (b) => b.month === selectedMonth && b.year === selectedYear,
  );

  // Hitung ringkasan total keseluruhan
  const totalBudgetAmount = filteredBudgets.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const totalSpentAmount = filteredBudgets.reduce(
    (acc, curr) => acc + curr.totalSpent,
    0,
  );
  const totalRemainingAmount = totalBudgetAmount - totalSpentAmount;

  // Handler simpan budget dummy baru
  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;

    const numericAmount = Number(formData.amount);
    // Kategori dummy mapping sederhana
    const categoriesMap: Record<string, { name: string; icon: string }> = {
      "cat-1": { name: "Food & Drinks", icon: "🍔" },
      "cat-2": { name: "Transport & Fuel", icon: "🚗" },
      "cat-3": { name: "Shopping & Lifestyle", icon: "🛍️" },
      "cat-4": { name: "Utilities & Bills", icon: "💡" },
    };

    const selectedCat = categoriesMap[formData.categoryId] || {
      name: "General",
      icon: "📦",
    };

    const newBudgetItem: BudgetWithProgress = {
      id: `b-${Date.now()}`,
      categoryName: selectedCat.name,
      categoryIcon: selectedCat.icon,
      color: "bg-primary/20 border-primary",
      amount: numericAmount,
      totalSpent: 0, // Awal buat masih 0
      remaining: numericAmount,
      percentage: 0,
      month: formData.month,
      year: formData.year,
    };

    setBudgets([newBudgetItem, ...budgets]);
    setIsModalOpen(false);
    setFormData({
      categoryId: "cat-1",
      amount: "",
      month: selectedMonth,
      year: selectedYear,
    });
  };

  // Handler Hapus Budget
  const handleDelete = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
      {/* Header Halaman */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
            Eounia / Finance
          </span>
          <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content">
            Monthly Budget Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Selector Bulan */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="select select-bordered border-2 border-black font-bold rounded-xl bg-base-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          {/* Tombol Buat Budget Baru */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-3 flex items-center gap-2 text-sm font-bold bg-accent text-accent-content border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px transition-all cursor-pointer"
          >
            <PlusIcon weight="bold" size={18} />
            <span>Set Budget</span>
          </button>
        </div>
      </header>

      {/* Kartu Ringkasan (Overview Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-base-100"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-base-content/70">
            Total Allocated Budget
          </p>
          <h3 className="heading-h3 font-black mt-1 text-base-content">
            {formatRupiah(totalBudgetAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-warning/30"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Total Spent This Month
          </p>
          <h3 className="heading-h3 font-black mt-1 text-neutral">
            {formatRupiah(totalSpentAmount)}
          </h3>
        </CardBox>
        <CardBox
          className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-success/30"
          rounded="xl"
        >
          <p className="text-caption font-bold uppercase tracking-wider text-neutral/70">
            Remaining Budget
          </p>
          <h3
            className={`heading-h3 font-black mt-1 ${totalRemainingAmount < 0 ? "text-error" : "text-neutral"}`}
          >
            {formatRupiah(totalRemainingAmount)}
          </h3>
        </CardBox>
      </div>

      {/* Daftar Grid Budget Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBudgets.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-black/30 rounded-2xl">
            <CalendarBlank
              size={48}
              className="mx-auto mb-2 text-base-content/40"
            />
            <p className="font-bold text-base-content/60">
              No budget data set for this month.
            </p>
          </div>
        ) : (
          filteredBudgets.map((item) => {
            const isOverBudget = item.percentage > 100;
            return (
              <CardBox
                key={item.id}
                className="p-5 flex flex-col justify-between gap-4 bg-base-100"
                rounded="2xl"
              >
                {/* Header Kategori */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border-2 border-black bg-base-300 flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {item.categoryIcon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-base-content">
                        {item.categoryName}
                      </h4>
                      <p className="text-xs font-bold text-base-content/60">
                        Target Limit: {formatRupiah(item.amount)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-error hover:bg-error/10 rounded-lg border border-transparent hover:border-black transition-all cursor-pointer"
                    title="Delete Budget"
                  >
                    <TrashIcon size={18} weight="bold" />
                  </button>
                </div>

                {/* Progress Bar & Nominal */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-base-content/70">
                      Spent: {formatRupiah(item.totalSpent)}
                    </span>
                    <span
                      className={`${isOverBudget ? "text-error" : "text-success"} flex items-center gap-1`}
                    >
                      {isOverBudget ? (
                        <WarningCircle weight="fill" />
                      ) : (
                        <CheckCircle weight="fill" />
                      )}
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>

                  {/* HTML Progress Bar Neobrutalism Style */}
                  <div className="w-full bg-base-300 border-2 border-black h-4 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOverBudget
                          ? "bg-error"
                          : item.percentage > 80
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-base-content/60 mt-1">
                    <span>Remaining: {formatRupiah(item.remaining)}</span>
                    <span>
                      {isOverBudget ? "⚠️ Limit Exceeded!" : "On Track"}
                    </span>
                  </div>
                </div>
              </CardBox>
            );
          })
        )}
      </div>

      {/* MODAL FORM TAMBAH BUDGET */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <CardBox
            className="w-full max-w-md p-6 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-base-100 flex flex-col gap-4 animate-in fade-in zoom-in duration-200"
            rounded="2xl"
          >
            <div className="flex justify-between items-center border-b-2 border-black/10 pb-3">
              <h3 className="heading-h3 font-black uppercase">
                Set New Budget
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="font-black text-lg px-2 py-1 rounded hover:bg-base-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBudget} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-wider text-base-content/70">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="select select-bordered border-2 border-black font-bold rounded-xl bg-base-100"
                >
                  <option value="cat-1">🍔 Food & Drinks</option>
                  <option value="cat-2">🚗 Transport & Fuel</option>
                  <option value="cat-3">🛍️ Shopping & Lifestyle</option>
                  <option value="cat-4">💡 Utilities & Bills</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-black uppercase tracking-wider text-base-content/70">
                  Budget Limit (IDR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1500000"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="input input-bordered border-2 border-black font-bold rounded-xl bg-base-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-black uppercase tracking-wider text-base-content/70">
                    Month
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                    className="select select-bordered border-2 border-black font-bold rounded-xl bg-base-100"
                  >
                    <option value="7">July</option>
                    <option value="8">August</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-black uppercase tracking-wider text-base-content/70">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="input input-bordered border-2 border-black font-bold rounded-xl bg-base-100"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold border-2 border-black rounded-xl hover:bg-base-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-black bg-primary text-primary-content border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px transition-all cursor-pointer"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </CardBox>
        </div>
      )}
    </div>
  );
}
