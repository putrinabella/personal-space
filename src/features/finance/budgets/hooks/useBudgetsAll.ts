import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { budgetsService } from "../budgets.service";
import { BudgetsEntry } from "../budgets.types";

export interface BudgetParams {
  month?: string;
  year?: string;
}

export function useBudgetAll(
  filters: Partial<BudgetParams> = {},
  options?: { enabled?: boolean },
) {
  return useBaseAll<BudgetsEntry, Partial<BudgetParams>>({
    queryKey: queryKeys.transaction.all(filters),
    fetcher: (params) => budgetsService.getAll(params),
    params: filters,
    enabled: options?.enabled,
  });
}
