import { TransactionEntry } from "@/features/finance/transaction/transaction.types";

export interface CalendarItem {
  id: string;
  title: string;
  description?: string;
  amount: number | string;
  type: "income" | "expense" | "neutral" | string;
  badges?: string[];
  iconSlug?: string;
  color?: string;
  [key: string]: any;
}

export interface DayData {
  dateStr: string;
  badgeText?: string;
  badgeType?: "income" | "expense" | "neutral";
  hasIncome?: boolean;
  hasExpense?: boolean;
  summary?: {
    incomeTotal?: number;
    expenseTotal?: number;
    [key: string]: any;
  };
  items: TransactionEntry[];
}

export type CalendarDataMap = Record<string, DayData>;
