import { queryKeys } from "@/lib/queryKeys";
import { defaultSaving, SavingFormData, validateSaving } from "../saving.types";
import { savingService } from "../saving.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";

export function useSavingForm(savingId?: string, enabled: boolean = true) {
  return useHouseholdWithAuthForm<SavingFormData>({
    id: savingId,
    enabled,
    entityName: "saving",
    defaultValues: defaultSaving,
    queryKey: queryKeys.saving.detail(savingId || ""),
    invalidateQueryKey: [
      ...queryKeys.saving.lists(),
      ...queryKeys.accounts.all(),
      ...queryKeys.pockets.all(),
    ],

    getDetail: async (id: string) => await savingService.getDetail(id),
    createFn: savingService.create,
    updateFn: savingService.update,
    validate: validateSaving,
    redirectTo: "/finance/dashboard",
    messages: {
      createSuccess: "Saving created successfully",
      updateSuccess: "Saving updated successfully",
      fetchError: "Failed to load saving data",
    },
  });
}
