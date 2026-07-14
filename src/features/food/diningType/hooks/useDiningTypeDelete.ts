import { queryKeys } from "@/lib/queryKeys";
import { diningTypeService } from "../dining.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useDiningTypeDelete() {
  return useBaseDelete({
    entityName: "DiningType",

    mutationFn: diningTypeService.delete,

    invalidateQueryKey: queryKeys.diningType.lists(),

    messages: {
      deleteSuccess: "Dining type deleted successfully",
    },
  });
}
