"use client";

import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { WalletIcon } from "@phosphor-icons/react/dist/ssr";
import { Check, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useBudgetsForm } from "@/features/finance/budgets/hooks/useBudgetsForm";
import { getCurrentYearMonth } from "@/utils/dateFormatter";
import { useCategoriesAll } from "@/features/finance/categories/hooks/useCategoriesAll";
import { useMemo, useEffect } from "react";

export default function CreateBudgetPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useBudgetsForm();
  const { data: dataCategory = [], isLoading: loadingCategory } =
    useCategoriesAll();

  const filteredCategories = useMemo(() => {
    return dataCategory.filter(
      (cat) => cat.type === "expense" && cat.parentId !== null,
    );
  }, [dataCategory]);

  const currentYM = getCurrentYearMonth();

  // Set default month & year otomatis saat pertama kali render jika belum ada
  useEffect(() => {
    if (!data.month || !data.year) {
      const [year, month] = currentYM.split("-");
      if (!data.year) setField("year", year);
      if (!data.month) setField("month", month);
    }
  }, [currentYM, data.month, data.year, setField]);

  const budgetMonthYear =
    data.month && data.year ? `${data.year}-${data.month}` : currentYM;

  const handleMonthYearChange = (val: string) => {
    if (!val) {
      setField("month", "");
      setField("year", "");
      return;
    }
    const [year, month] = val.split("-");
    setField("year", year);
    setField("month", month);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader title="SET MONTHLY BUDGET" icon={WalletIcon} color="accent" />
      <CardBox
        className="p-4 md:p-6 flex flex-col gap-6 bg-base-100 border-2 border-neutral shadow-sm"
        rounded="2xl"
      >
        <FormInput
          label="Category"
          required
          options={filteredCategories.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
          dropdownType="select"
          value={data.categoryId}
          onChange={(val) => setField("categoryId", val)}
          placeholder="Select category"
          disabled={loadingCategory}
        />
        <FormInput
          label="Budget Amount Limit"
          type="money"
          placeholder="0"
          value={data.amount}
          onChange={(val) => setField("amount", val)}
          required
        />
        <FormInput
          type="month"
          label="Month & Year"
          value={budgetMonthYear}
          onChange={handleMonthYearChange}
          required
        />
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="accent"
            onClick={handleSubmit}
            pressable
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Check size={18} /> Save Budget
              </>
            )}
          </CardBox>

          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={() => router.back()}
            pressable
          >
            <X size={18} /> Cancel
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
