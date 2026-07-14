import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { categoriesService } from "../categories.service";
import {
  defaultCategories,
  validateCategories,
  CategoriesFormData,
} from "../categories.types";

export function useCategoriesForm(
  categoriesId?: string,
  enabled: boolean = true,
) {
  return useBaseForm<CategoriesFormData>({
    id: categoriesId,
    enabled: enabled,
    entityName: "categories",
    defaultValues: defaultCategories,
    queryKey: queryKeys.categories.detail(categoriesId || ""),
    invalidateQueryKey: queryKeys.categories.lists(),

    getDetail: async (id) => {
      const data = await categoriesService.getDetail(id);
      return data as any;
    },

    createFn: categoriesService.create,
    updateFn: categoriesService.update,
    validate: validateCategories,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      fetchError: "Failed to load category data",
    },
  });
}
