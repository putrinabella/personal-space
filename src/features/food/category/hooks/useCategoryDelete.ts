import { queryKeys } from "@/lib/queryKeys";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";
import { categoryService } from "../category.service";

export function useCategoryDelete() {
  return useBaseDelete({
    entityName: "Category",

    mutationFn: categoryService.delete,

    invalidateQueryKey: queryKeys.category.lists(),

    messages: {
      deleteSuccess: "Category deleted successfully",
    },
  });
}
