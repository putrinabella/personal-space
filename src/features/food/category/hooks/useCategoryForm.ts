import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { categoryService } from "../category.service";
import {
  defaultCategory,
  validateCategory,
  CategoryFormData,
} from "../category.types";

export function useCategoryForm(categoryId?: string, enabled: boolean = true) {
  return useBaseForm<CategoryFormData>({
    id: categoryId,
    enabled: enabled,
    entityName: "category",
    defaultValues: defaultCategory,
    queryKey: queryKeys.category.detail(categoryId || ""),
    invalidateQueryKey: queryKeys.category.all,

    getDetail: async (id) => {
      const data = await categoryService.getDetail(id);
      return data as any;
    },

    createFn: categoryService.create,
    updateFn: categoryService.update,
    validate: validateCategory,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      fetchError: "Failed to load category data",
    },
  });
}
