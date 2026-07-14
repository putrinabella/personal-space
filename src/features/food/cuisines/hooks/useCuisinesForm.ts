import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { cuisinesService } from "../cuisines.service";
import {
  defaultCuisines,
  validateCuisines,
  CuisinesFormData,
} from "../cuisines.types";

export function useCuisinesForm(cuisinesId?: string, enabled: boolean = true) {
  return useBaseForm<CuisinesFormData>({
    id: cuisinesId,
    enabled: enabled,
    entityName: "cuisines",
    defaultValues: defaultCuisines,
    queryKey: queryKeys.cuisines.detail(cuisinesId || ""),
    invalidateQueryKey: queryKeys.cuisines.lists(),

    getDetail: async (id) => {
      const data = await cuisinesService.getDetail(id);
      return data as any;
    },

    createFn: cuisinesService.create,
    updateFn: cuisinesService.update,
    validate: validateCuisines,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      fetchError: "Failed to load category data",
    },
  });
}
