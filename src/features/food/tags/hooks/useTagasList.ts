import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { TagsItem } from "../tags.types";
import { tagsService } from "../tags.service";
import { PaginatedParams } from "@/shared/types/common";

export function useTagsList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<TagsItem, PaginatedParams>({
    queryKey: queryKeys.tags.list(params),
    // Sekarang ini tidak akan error lagi
    fetcher: (p) => tagsService.getPaginated(p),
    params,
  });
}
