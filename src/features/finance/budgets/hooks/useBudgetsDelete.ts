import { queryKeys } from "@/lib/queryKeys";
import { budgetsService } from "../budgets.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useBudgetsDelete() {
  return useBaseDelete({
    entityName: "Budgets",

    mutationFn: budgetsService.delete,

    invalidateQueryKey: queryKeys.budgets.lists(),

    messages: {
      deleteSuccess: "Budget deleted successfully",
    },
  });
}
