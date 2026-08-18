import { queryKeys } from "@/lib/queryKeys";
import { concernsService } from "../concerns.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useConcernsDelete() {
  return useBaseDelete({
    entityName: "Concerns",

    mutationFn: concernsService.delete,

    invalidateQueryKey: queryKeys.concerns.lists(),

    messages: {
      deleteSuccess: "Concern deleted successfully",
    },
  });
}
