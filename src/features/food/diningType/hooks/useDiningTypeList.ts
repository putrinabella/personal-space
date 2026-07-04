import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { DiningTypeEntry } from "../dining.types";
import { diningTypeService } from "../dining.service";
import { PaginatedParams } from "@/shared/types/common";

export function useDiningTypeList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<DiningTypeEntry, PaginatedParams>({
    queryKey: queryKeys.diningType.list(params),
    fetcher: (p) => diningTypeService.getPaginated(p),
    params,
    enabled,
  });
}
