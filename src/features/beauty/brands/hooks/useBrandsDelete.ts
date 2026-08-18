import { queryKeys } from "@/lib/queryKeys";
import { brandsService } from "../brands.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useBrandsDelete() {
  return useBaseDelete({
    entityName: "Brands",

    mutationFn: brandsService.delete,

    invalidateQueryKey: queryKeys.brands.lists(),

    messages: {
      deleteSuccess: "Brand deleted successfully",
    },
  });
}
