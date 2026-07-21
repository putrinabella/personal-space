import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { tagsService } from "../tags.service";
import { TagEntry } from "../tags.types";

export function useTagAll() {
  return useBaseAll<TagEntry>({
    queryKey: queryKeys.tags.all(),

    fetcher: tagsService.getAll,
  });
}
