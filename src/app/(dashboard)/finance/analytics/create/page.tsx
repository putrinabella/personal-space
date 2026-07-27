"use client";

import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { WalletIcon } from "@phosphor-icons/react/dist/ssr";
import { Check, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useBudgetsForm } from "@/features/finance/budgets/hooks/useBudgetsForm";
import { getCurrentYearMonth } from "@/utils/dateFormatter";

export default function CreateBudgetPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useBudgetsForm();

  // Dapatkan format "YYYY-MM" untuk nilai awal jika masih kosong
  const currentYM = getCurrentYearMonth();
  const budgetMonthYear =
    data.month && data.year ? `${data.year}-${data.month}` : currentYM;

  // Handle perubahan input tipe month (YYYY-MM) lalu pecah kembali ke field month & year
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
        {/* Category ID - Dapat diganti dengan Select Dropdown Kategori jika tersedia */}
        <FormInput
          label="Category ID"
          value={data.categoryId}
          onChange={(val) => setField("categoryId", val)}
          placeholder="Enter category ID..."
          required
        />

        {/* Amount Limit */}
        <FormInput
          label="Budget Amount Limit"
          type="money"
          placeholder="0"
          value={data.amount}
          onChange={(val) => setField("amount", val)}
          required
        />

        {/* Month & Year Picker yang Cantik dan Terintegrasi */}
        <FormInput
          type="month"
          label="Month & Year"
          value={budgetMonthYear}
          onChange={handleMonthYearChange}
          required
        />

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="primary"
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
