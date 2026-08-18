import { queryKeys } from "@/lib/queryKeys";
import { categoriesService } from "../categories.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useCategoriesDelete() {
  return useBaseDelete({
    entityName: "Categories",

    mutationFn: categoriesService.delete,

    invalidateQueryKey: queryKeys.categoriesBeauty.lists(),

    messages: {
      deleteSuccess: "Categories deleted successfully",
    },
  });
}
