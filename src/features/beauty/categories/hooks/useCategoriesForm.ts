import { queryKeys } from "@/lib/queryKeys";
import {
  defaultCategories,
  CategoriesFormData,
  validateCategories,
} from "../categories.types";
import { categoriesService } from "../categories.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useCategoriesForm(
  categoriesId?: string,
  enabled: boolean = true,
) {
  return useHouseholdForm<CategoriesFormData>({
    id: categoriesId,
    enabled,
    entityName: "categories",
    defaultValues: defaultCategories,
    queryKey: queryKeys.categoriesBeauty.detail(categoriesId || ""),
    invalidateQueryKey: queryKeys.categoriesBeauty.all(),
    transformBeforeSubmit: (data: CategoriesFormData) => {
      return {
        ...data,
        // Jika parentId adalah string kosong, paksa jadi null
        parentId:
          data.parentId && data.parentId.trim() !== "" ? data.parentId : null,
      };
    },
    getDetail: async (id: string) => await categoriesService.getDetail(id),
    createFn: categoriesService.create,
    updateFn: categoriesService.update,
    validate: validateCategories,
    redirectTo: "/beauty/settings",
    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      fetchError: "Failed to load category data",
    },
  });
}
