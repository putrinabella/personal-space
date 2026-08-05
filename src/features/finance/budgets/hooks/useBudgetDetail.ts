import { useBaseDetail } from "@/shared/hooks/core/use-base-detail";
import { BudgetsEntry } from "../budgets.types";
import { queryKeys } from "@/lib/queryKeys";
import { budgetsService } from "../budgets.service";

export function useBudgetDetail(budgetId?: string) {
  return useBaseDetail<BudgetsEntry>({
    id: budgetId,

    queryKey: queryKeys.budgets.detail(budgetId || ""),

    fetcher: budgetsService.getDetail,
  });
}
