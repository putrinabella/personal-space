// import { queryKeys } from "@/lib/queryKeys";
import { unitService } from "../unit.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useUnitDelete() {
  return useBaseDelete({
    entityName: "Unit",

    mutationFn: unitService.delete,

    // invalidateQueryKey: [
    //   ...queryKeys.unit.all(),
    //   ...queryKeys.unit.list(),
    //   ...queryKeys.items.list(),
    //   ...queryKeys.items.all(),
    // ],
    invalidateQueryKey: ["units"],

    messages: {
      deleteSuccess: "Unit deleted successfully",
    },
  });
}
