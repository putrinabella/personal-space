import { TransactionEntry } from "@/features/finance/transaction/transaction.types";

export interface CalendarItem {
  id: string;
  title: string;
  description?: string; // Tambahkan sebagai alternatif jika dibutuhkan
  amount: number | string; // Diubah dari amount?: menjadi wajib (menghilangkan tanda ?)
  type: "income" | "expense" | "neutral" | string; // Diubah dari type?: menjadi wajib
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
