import { queryKeys } from "@/lib/queryKeys";
import { defaultBrands, BrandsFormData, validateBrands } from "../waste.types";
import { brandsService } from "../waste.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useBrandsForm(brandsId?: string, enabled: boolean = true) {
  return useHouseholdForm<BrandsFormData>({
    id: brandsId,
    enabled,
    entityName: "brands",
    defaultValues: defaultBrands,
    queryKey: queryKeys.brands.detail(brandsId || ""),
    invalidateQueryKey: queryKeys.brands.lists(),

    getDetail: async (id: string) => await brandsService.getDetail(id),
    createFn: brandsService.create,
    updateFn: brandsService.update,
    validate: validateBrands,
    redirectTo: "/beauty/settings",
    messages: {
      createSuccess: "Brand created successfully",
      updateSuccess: "Brand updated successfully",
      fetchError: "Failed to load brand data",
    },
  });
}
