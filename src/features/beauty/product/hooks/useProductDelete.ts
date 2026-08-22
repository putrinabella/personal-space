import { queryKeys } from "@/lib/queryKeys";
import { itemsService } from "../product.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useProductDelete() {
  return useBaseDelete({
    entityName: "Product",

    mutationFn: itemsService.delete,

    invalidateQueryKey: queryKeys.items.lists(),

    messages: {
      deleteSuccess: "Product deleted successfully",
    },
  });
}
