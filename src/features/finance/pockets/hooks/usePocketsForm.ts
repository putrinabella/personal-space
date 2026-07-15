import { queryKeys } from "@/lib/queryKeys";
import {
  defaultPockets,
  PocketsFormData,
  validatePockets,
} from "../pockets.types";
import { pocketsService } from "../pockets.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function usePocketsForm(pocketsId?: string, enabled: boolean = true) {
  return useHouseholdForm<PocketsFormData>({
    id: pocketsId,
    enabled,
    entityName: "pockets",
    defaultValues: defaultPockets,
    queryKey: queryKeys.pockets.detail(pocketsId || ""),
    invalidateQueryKey: queryKeys.pockets.lists(),

    getDetail: async (id: string) => await pocketsService.getDetail(id),
    createFn: pocketsService.create,
    updateFn: pocketsService.update,
    validate: validatePockets,
    redirectTo: "/finance/settings",
    messages: {
      createSuccess: "Pocket created successfully",
      updateSuccess: "Pocket updated successfully",
      fetchError: "Failed to load pocket data",
    },
  });
}
