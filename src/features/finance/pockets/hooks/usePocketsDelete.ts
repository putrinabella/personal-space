import { queryKeys } from "@/lib/queryKeys";
import { typeService } from "../pockets.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useTypeDelete() {
  return useBaseDelete({
    entityName: "Type",

    mutationFn: typeService.delete,

    invalidateQueryKey: queryKeys.type.lists(),

    messages: {
      deleteSuccess: "Type deleted successfully",
    },
  });
}
