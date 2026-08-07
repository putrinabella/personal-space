import { BaseItem } from "@/shared/types/base.types";
import { AccountsEntry } from "../accounts/accounts.types";
import { PocketsEntry } from "../pockets/pockets.types";
import { CategoriesEntry } from "../categories/categories.types";

export interface TransactionFormData {
  householdId: string;
  accountId: string;
  pocketId: string;
  categoryId: string;
  createdById: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  date: string;
}

export interface TransactionEntry extends BaseItem, TransactionFormData {
  account: AccountsEntry;
  pocket: PocketsEntry;
  category: CategoriesEntry;
}

export const defaultTransaction: TransactionFormData = {
  householdId: "",
  accountId: "",
  pocketId: "",
  categoryId: "",
  createdById: "",
  amount: 0,
  type: "",
  status: "",
  description: "",
  date: "",
};

export const validateTransaction = (payload: TransactionFormData): string[] => {
  const errors: string[] = [];
  if (!payload.amount) errors.push("Jumlah wajib diisi.");
  if (!payload.type) errors.push("Tipe wajib diisi.");
  return errors;
};
