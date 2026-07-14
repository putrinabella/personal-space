import { queryKeys } from "@/lib/queryKeys";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";
import { categoriesService } from "../categories.service";

export function useCategoriesDelete() {
  return useBaseDelete({
    entityName: "Categories",

    mutationFn: categoriesService.delete,

    invalidateQueryKey: queryKeys.categories.lists(),

    messages: {
      deleteSuccess: "Categories deleted successfully",
    },
  });
}
