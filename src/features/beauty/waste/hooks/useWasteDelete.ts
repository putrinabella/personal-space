import { queryKeys } from "@/lib/queryKeys";
import { wasteService } from "../waste.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useWasteDelete() {
  return useBaseDelete({
    entityName: "Waste",

    mutationFn: wasteService.delete,

    invalidateQueryKey: queryKeys.waste.lists(),

    messages: {
      deleteSuccess: "Waste deleted successfully",
    },
  });
}
