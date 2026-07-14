import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { pocketsService } from "../pockets.service";
import { PaginatedParams } from "@/shared/types/common";
import { PocketsEntry } from "../pockets.types";

export function usePocketsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<PocketsEntry, PaginatedParams>({
    queryKey: queryKeys.pockets.list(params),
    fetcher: (p) => pocketsService.getPaginated(p),
    params,
    enabled,
  });
}
