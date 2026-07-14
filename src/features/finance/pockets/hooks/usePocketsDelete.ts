import { queryKeys } from "@/lib/queryKeys";
import { pocketsService } from "../pockets.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function usePocketsDelete() {
  return useBaseDelete({
    entityName: "Pockets",

    mutationFn: pocketsService.delete,

    invalidateQueryKey: queryKeys.pockets.lists(),

    messages: {
      deleteSuccess: "Pockets deleted successfully",
    },
  });
}
