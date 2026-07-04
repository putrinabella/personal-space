import { queryKeys } from "@/lib/queryKeys";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";
import { cuisinesService } from "../cuisines.service";

export function useCuisinesDelete() {
  return useBaseDelete({
    entityName: "Cuisines",

    mutationFn: cuisinesService.delete,

    invalidateQueryKey: queryKeys.cuisines.lists(),

    messages: {
      deleteSuccess: "Cuisines berhasil dihapus",
    },
  });
}
