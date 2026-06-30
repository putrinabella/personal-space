import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { DiningTypesEntry } from "../dining.types";
import { DiningTypesEntryService } from "../dining.service";
import { PaginatedParams } from "@/shared/types/common";

export function useDiningTypeList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<DiningTypesEntry, PaginatedParams>({
    queryKey: queryKeys.DiningTypesEntry.list(params),
    fetcher: (p) => DiningTypesEntryService.getPaginated(p),
    params,
  });
}
