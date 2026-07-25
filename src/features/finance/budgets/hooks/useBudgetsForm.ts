import { queryKeys } from "@/lib/queryKeys";
import {
  defaultBudgets,
  BudgetsFormData,
  validateBudgets,
} from "../budgets.types";
import { budgetsService } from "../budgets.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useBudgetsForm(budgetsId?: string, enabled: boolean = true) {
  return useHouseholdForm<BudgetsFormData>({
    id: budgetsId,
    enabled,
    entityName: "budgets",
    defaultValues: defaultBudgets,
    queryKey: queryKeys.budgets.detail(budgetsId || ""),
    invalidateQueryKey: queryKeys.budgets.lists(),

    getDetail: async (id: string) => await budgetsService.getDetail(id),
    createFn: budgetsService.create,
    updateFn: budgetsService.update,
    validate: validateBudgets,
    redirectTo: "/finance/settings",
    messages: {
      createSuccess: "Budget created successfully",
      updateSuccess: "Budget updated successfully",
      fetchError: "Failed to load budget data",
    },
  });
}
