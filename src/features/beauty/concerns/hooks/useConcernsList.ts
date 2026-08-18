import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { concernsService } from "../concerns.service";
import { PaginatedParams } from "@/shared/types/common";
import { ConcernsEntry } from "../concerns.types";

export function useConcernsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    per_page: 1000,
    search: title,
  };

  return useBaseList<ConcernsEntry, PaginatedParams>({
    queryKey: queryKeys.concerns.list(params),
    fetcher: (p) => concernsService.getPaginated(p),
    params,
    enabled,
  });
}
