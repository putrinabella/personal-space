import { queryKeys } from "@/lib/queryKeys";
import { unitService } from "../unit.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";
import { defaultUnit, UnitFormData, validateUnit } from "../unit.types";

export function useUnitForm(unitId?: string, enabled: boolean = true) {
  return useHouseholdWithAuthForm<UnitFormData>({
    id: unitId,
    enabled,
    entityName: "unit",
    defaultValues: defaultUnit,
    queryKey: queryKeys.unit.detail(unitId || ""),
    invalidateQueryKey: queryKeys.unit.all(),

    getDetail: async (id: string) => await unitService.getDetail(id),
    createFn: unitService.create,
    updateFn: unitService.update,
    validate: validateUnit,
    redirectTo: "/beauty/dashboard",
    messages: {
      createSuccess: "Unit created successfully",
      updateSuccess: "Unit updated successfully",
      fetchError: "Failed to load unit data",
    },
  });
}
