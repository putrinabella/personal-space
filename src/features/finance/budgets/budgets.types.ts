import { BaseItem } from "@/shared/types/base.types";
import { CategoriesEntry } from "../categories/categories.types";

export interface BudgetsFormData {
  householdId: string;
  categoryId: string;
  amount: string;
  month: string;
  year: string;
}

export interface BudgetsEntry extends BaseItem, BudgetsFormData {
  type?: string;
  iconSlug?: string;
  monthlyAllocationAmount?: string;
  isAutoAllocationActive?: boolean;
  allocationDay?: string;
  color?: string;
  currentBalance?: string;
  category?: CategoriesEntry;
}

export const defaultBudgets: BudgetsFormData = {
  householdId: "",
  categoryId: "",
  amount: "",
  month: "",
  year: "",
};

export const validateBudgets = (payload: BudgetsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.categoryId) errors.push("Kategori wajib dipilih.");
  if (!payload.amount || Number(payload.amount) <= 0)
    errors.push("Jumlah budget wajib diisi dan harus lebih dari 0.");
  // if (!payload.month) errors.push("Bulan wajib diisi.");
  // if (!payload.year) errors.push("Tahun wajib diisi.");
  return errors;
};
