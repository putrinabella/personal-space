import { queryKeys } from "@/lib/queryKeys";
import {
  defaultConcerns,
  ConcernsFormData,
  validateConcerns,
} from "../concerns.types";
import { concernsService } from "../concerns.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useConcernsForm(concernsId?: string, enabled: boolean = true) {
  return useHouseholdForm<ConcernsFormData>({
    id: concernsId,
    enabled,
    entityName: "concerns",
    defaultValues: defaultConcerns,
    queryKey: queryKeys.concerns.detail(concernsId || ""),
    invalidateQueryKey: queryKeys.concerns.lists(),

    getDetail: async (id: string) => await concernsService.getDetail(id),
    createFn: concernsService.create,
    updateFn: concernsService.update,
    validate: validateConcerns,
    redirectTo: "/beauty/settings",
    messages: {
      createSuccess: "Concern created successfully",
      updateSuccess: "Concern updated successfully",
      fetchError: "Failed to load concern data",
    },
  });
}
