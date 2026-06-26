import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { diningTypes } from "../dining.types";
import { diningTypesService } from "../dining.service";
import { PaginatedParams } from "@/shared/types/common";

export function useDiningTypeList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<diningTypes, PaginatedParams>({
    queryKey: queryKeys.diningTypes.list(params),
    fetcher: (p) => diningTypesService.getPaginated(p),
    params,
  });
}
