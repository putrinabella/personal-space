import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { TagEntry } from "../tags.types";
import { tagsService } from "../tags.service";
import { PaginatedParams } from "@/shared/types/common";

export function useTagsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<TagEntry, PaginatedParams>({
    queryKey: queryKeys.tags.list(params),
    fetcher: (p) => tagsService.getPaginated(p),
    params,
    enabled,
  });
}
