import { queryKeys } from "@/lib/queryKeys";
import { productService } from "../product.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useProductDelete() {
  return useBaseDelete({
    entityName: "Product",

    mutationFn: productService.delete,

    invalidateQueryKey: queryKeys.items.lists(),

    messages: {
      deleteSuccess: "Product deleted successfully",
    },
  });
}
