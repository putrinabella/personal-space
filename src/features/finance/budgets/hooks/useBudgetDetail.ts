import { useBaseDetail } from "@/shared/hooks/core/use-base-detail";
import { BudgetsEntry } from "../budgets.types";
import { queryKeys } from "@/lib/queryKeys";
import { budgetsService } from "../budgets.service";

export function usePocketDetail(pocketId?: string) {
  return useBaseDetail<BudgetsEntry>({
    id: pocketId,

    queryKey: queryKeys.budgets.detail(pocketId || ""),

    fetcher: budgetsService.getDetail,
  });
}
