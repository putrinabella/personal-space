import { queryKeys } from "@/lib/queryKeys";
import { tagsService } from "../tags.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useTagDelete() {
  return useBaseDelete({
    entityName: "Tag",

    mutationFn: tagsService.delete,

    invalidateQueryKey: queryKeys.tags.lists(),

    messages: {
      deleteSuccess: "Tag deleted successfully",
    },
  });
}
