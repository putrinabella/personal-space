"use client";

import { useState, useMemo } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import {
  Wallet,
  Check,
  ArrowDownRight,
  ArrowUpRight,
  X,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useTransactionForm } from "@/features/finance/transaction/hooks/useTransactionForm";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import { usePocketAll } from "@/features/finance/pockets/hooks/usePocketAll";
import { useCategoriesAll } from "@/features/finance/categories/hooks/useCategoriesAll";
import SelectionItem from "@/shared/components/SelectionItem";

export default function CreateTransactionPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useTransactionForm();
  const { data: accounts } = useAccountsAll();
  const { data: pockets } = usePocketAll();
  const { data: categories } = useCategoriesAll();
  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === data.accountId),
    [accounts, data.accountId],
  );
  const selectedPocket = useMemo(
    () => pockets.find((pocket) => pocket.id === data.pocketId),
    [pockets, data.pocketId],
  );

  const filteredCategories = useMemo(
    () => categories.filter((cat) => cat.type === data.type),
    [categories, data.type],
  );
  const [manualExpandedId, setManualExpandedId] = useState<string | null>(null);
  const expandedParentId = useMemo(() => {
    if (manualExpandedId) return manualExpandedId;
    if (data.type === "expense" && categories.length > 0) {
      const firstExpenseParent = categories.find(
        (cat) => cat.type === "expense" && !cat.parentId,
      );
      return firstExpenseParent ? firstExpenseParent.id : null;
    }
    return null;
  }, [manualExpandedId, categories, data.type]);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CardHeader title="NEW TRANSACTION" icon={Wallet} color="secondary" />

      <CardBox className="p-4 md:p-6 flex flex-col gap-6" rounded="2xl">
        <div className="flex bg-base-200 p-1 rounded-xl">
          <button
            onClick={() => setField("type", "expense")}
            className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2  ${data.type === "expense" ? "bg-secondary text-white shadow" : "opacity-60"}`}
          >
            <ArrowUpRight size={18} /> Expense
          </button>
          <button
            onClick={() => setField("type", "income")}
            className={`flex-1 py-2 rounded-lg font-bold transition  flex items-center justify-center gap-2 ${data.type === "income" ? "bg-success text-white shadow" : "opacity-60"}`}
          >
            <ArrowDownRight size={18} /> Income
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-body tracking-wider">Select Account</h3>
            {selectedAccount && (
              <span className="text-body bg-primary/10 px-3 py-1 text-bold rounded-full">
                Balance: Rp {selectedAccount.currentBalance}
              </span>
            )}
          </div>
          <SelectionItem
            entity="accounts"
            data={accounts}
            viewType="card"
            selectedId={data.accountId}
            onSelect={(item) => setField("accountId", item.id)}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-body tracking-wider">Select Category</h3>
          <SelectionItem
            entity="categories"
            data={filteredCategories}
            viewType="card"
            selectedId={data.categoryId}
            onSelect={(item) => setField("categoryId", item.id)}
            expandedParentId={expandedParentId}
            onToggleParent={(parentId) =>
              setManualExpandedId((prev) =>
                prev === parentId ? null : parentId,
              )
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-body tracking-wider">Pocket (Optional)</h3>
              {selectedPocket && (
                <span className="text-body bg-primary/10 px-3 py-1 text-bold rounded-full">
                  Balance: Rp {selectedPocket.currentBalance}
                </span>
              )}
            </div>
            <FormInput
              options={pockets.map((p) => ({ label: p.name, value: p.id }))}
              dropdownType="select"
              value={data.pocketId}
              onChange={(val) => setField("pocketId", val)}
              placeholder="Select pocket"
              label={""}
            />
          </div>

          <FormInput
            label="Amount"
            type="money"
            placeholder="0"
            value={data.amount}
            onChange={(val) => setField("amount", val)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Date"
            type="date"
            value={data.date}
            onChange={(val) => setField("date", val)}
          />
          <FormInput
            label="Description"
            placeholder="What is this for?"
            value={data.description}
            onChange={(val) => setField("description", val)}
          />
        </div>

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
                <Check size={18} /> Confirm Transaction
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
