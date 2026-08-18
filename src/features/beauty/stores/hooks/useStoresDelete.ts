import { queryKeys } from "@/lib/queryKeys";
import { storesService } from "../stores.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useStoresDelete() {
  return useBaseDelete({
    entityName: "Stores",

    mutationFn: storesService.delete,

    invalidateQueryKey: queryKeys.stores.lists(),

    messages: {
      deleteSuccess: "Store deleted successfully",
    },
  });
}
