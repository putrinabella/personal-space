import { queryKeys } from "@/lib/queryKeys";
import { itemsService } from "../items.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useItemsDelete() {
  return useBaseDelete({
    entityName: "Items",

    mutationFn: itemsService.delete,

    invalidateQueryKey: queryKeys.items.lists(),

    messages: {
      deleteSuccess: "Items deleted successfully",
    },
  });
}
