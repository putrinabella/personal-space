import { BaseItem } from "@/shared/types/base.types";

export interface SumarriesEntry extends BaseItem {
  householdId: string;
  month: string;
  year: string;
  totalIncome: string;
  totalExpense: boolean;
  totalSavings: string;
  netBalance: string;
  totalBalance?: string | number;
}
