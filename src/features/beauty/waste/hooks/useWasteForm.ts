import { queryKeys } from "@/lib/queryKeys";
import { defaultWaste, WasteFormData, validateWaste } from "../waste.types";
import { wasteService } from "../waste.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useWasteForm(wasteId?: string, enabled: boolean = true) {
  return useHouseholdForm<WasteFormData>({
    id: wasteId,
    enabled,
    entityName: "waste",
    defaultValues: defaultWaste,
    queryKey: queryKeys.waste.detail(wasteId || ""),
    invalidateQueryKey: queryKeys.waste.lists(),

    getDetail: async (id: string) => await wasteService.getDetail(id),
    createFn: wasteService.create,
    updateFn: wasteService.update,
    validate: validateWaste,
    redirectTo: "/beauty/settings",
    messages: {
      createSuccess: "Waste created successfully",
      updateSuccess: "Waste updated successfully",
      fetchError: "Failed to load waste data",
    },
  });
}
