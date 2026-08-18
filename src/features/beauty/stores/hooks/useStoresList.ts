import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { storesService } from "../stores.service";
import { PaginatedParams } from "@/shared/types/common";
import { StoresEntry } from "../stores.types";

export function useStoresList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    per_page: 1000,
    search: title,
  };

  return useBaseList<StoresEntry, PaginatedParams>({
    queryKey: queryKeys.stores.list(params),
    fetcher: (p) => storesService.getPaginated(p),
    params,
    enabled,
  });
}
