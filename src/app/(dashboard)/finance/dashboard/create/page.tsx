"use client";

import { useState, useMemo } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import {
  Wallet,
  Check,
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useTransactionForm } from "@/features/finance/transaction/hooks/useTransactionForm";
import { useAccountsAll } from "@/features/finance/accounts/hooks/useAccountsAll";
import { usePocketsAll } from "@/features/finance/pockets/hooks/usePocketsAll";
import { useCategoriesAll } from "@/features/finance/categories/hooks/useCategoriesAll";

export default function CreateTransactionPage() {
  const router = useRouter();
  const { data, setField, handleSubmit, saving } = useTransactionForm();

  // Fetch data account & pocket
  const { data: accounts } = useAccountsAll();
  const { data: pockets } = usePocketsAll();
  const { data: categories } = useCategoriesAll();
  // Mencari informasi saldo dari akun yang dipilih
  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === data.accountId),
    [accounts, data.accountId],
  );

  // Mencari informasi saldo dari pocket yang dipilih
  const selectedPocket = useMemo(
    () => pockets.find((p) => p.id === data.pocketId),
    [pockets, data.pocketId],
  );

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <CardHeader title="NEW TRANSACTION" icon={Wallet} color="primary" />

      <CardBox className="p-8 flex flex-col gap-6" rounded="2xl">
        {/* Tipe Transaksi */}
        <div className="flex bg-base-200 p-1 rounded-xl">
          <button
            onClick={() => setField("type", "expense")}
            className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${data.type === "expense" ? "bg-error text-white shadow" : "opacity-60"}`}
          >
            <ArrowUpRight size={18} /> Expense
          </button>
          <button
            onClick={() => setField("type", "income")}
            className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${data.type === "income" ? "bg-success text-white shadow" : "opacity-60"}`}
          >
            <ArrowDownRight size={18} /> Income
          </button>
        </div>

        {/* Account Selection + Live Balance */}
        <div className="space-y-2">
          <FormInput
            label="Account"
            options={accounts.map((a) => ({ label: a.name, value: a.id }))}
            dropdownType="select"
            value={data.accountId}
            onChange={(val) => setField("accountId", val)}
            placeholder="Select account"
          />
          {selectedAccount && (
            <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-2 rounded-lg">
              Available balance:{" "}
              <span className="font-bold">
                Rp {Number(selectedAccount.currentBalance).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Pocket Selection (Optional) */}
        <FormInput
          label="Pocket (Optional)"
          options={pockets.map((p) => ({ label: p.name, value: p.id }))}
          dropdownType="select"
          value={data.pocketId}
          onChange={(val) => setField("pocketId", val)}
          placeholder="Select pocket"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Amount"
            type="money"
            placeholder="0"
            value={data.amount}
            onChange={(val) => setField("amount", val)}
          />
          <FormInput
            label="Date"
            type="date"
            value={data.date}
            onChange={(val) => setField("date", val)}
          />
        </div>
        <FormInput
          label="Category"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          dropdownType="select"
          value={data.categoryId}
          onChange={(val) => setField("categoryId", val)}
          placeholder="Select category"
        />
        <FormInput
          label="Description"
          placeholder="What is this for?"
          value={data.description}
          onChange={(val) => setField("description", val)}
        />

        <div className="flex gap-4 pt-4">
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
                <Check size={18} /> Confirm
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
            <ArrowLeft size={18} /> Back
          </CardBox>
        </div>
      </CardBox>
    </div>
  );
}
