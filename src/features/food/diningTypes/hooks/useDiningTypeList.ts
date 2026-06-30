import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { DiningTypesEntry } from "../dining.types";
import { diningTypeService } from "../dining.service";
import { PaginatedParams } from "@/shared/types/common";

export function useDiningTypeList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<DiningTypesEntry, PaginatedParams>({
    queryKey: queryKeys.diningTypes.list(params),
    fetcher: (p) => diningTypeService.getPaginated(p),
    params,
  });
}
