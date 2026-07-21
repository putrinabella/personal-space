export interface CalendarItem {
  id: string;
  title: string;
  amount?: number | string;
  type?: "income" | "expense" | "neutral" | string;
  badges?: string[];
  iconSlug?: string;
  color?: string;
  [key: string]: any; // Fleksibel untuk data tambahan (misal: rating movie, kcal food)
}

export interface DayData {
  dateStr: string; // Format "YYYY-MM-DD"
  badgeText?: string; // misal: "▲ Rp450K", "1,200 kcal", "2 Movies"
  badgeType?: "income" | "expense" | "neutral";
  hasIncome?: boolean;
  hasExpense?: boolean;
  summary?: {
    incomeTotal?: number;
    expenseTotal?: number;
    [key: string]: any;
  };
  items: CalendarItem[];
}

export type CalendarDataMap = Record<string, DayData>; // Key-nya "YYYY-MM-DD"
