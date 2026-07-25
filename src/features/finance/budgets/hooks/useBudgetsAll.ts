import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { budgetsService } from "../budgets.service";
import { BudgetsEntry } from "../budgets.types";

export function useBudgetsAll() {
  return useBaseAll<BudgetsEntry>({
    queryKey: queryKeys.budgets.all(),

    fetcher: budgetsService.getAll,
  });
}
