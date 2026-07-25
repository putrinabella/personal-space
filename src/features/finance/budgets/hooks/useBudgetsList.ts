import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { budgetsService } from "../budgets.service";
import { PaginatedParams } from "@/shared/types/common";
import { BudgetsEntry } from "../budgets.types";

export function useBudgetsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<BudgetsEntry, PaginatedParams>({
    queryKey: queryKeys.budgets.list(params),
    fetcher: (p) => budgetsService.getPaginated(p),
    params,
    enabled,
  });
}
