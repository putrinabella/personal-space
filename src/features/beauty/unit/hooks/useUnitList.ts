import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { unitService } from "../unit.service";
import { PaginatedParams } from "@/shared/types/common";
import { UnitEntry } from "../unit.types";

export interface UnitParams extends PaginatedParams {
  categoryId?: string;
  brandId?: string;
  storeId?: string;
  status?: string;
  concernId?: string;
  expiryWindow?: string;
  stockStatus?: string;
  search?: string;
}

export function useUnitList(page = 1, filters: Partial<UnitParams> = {}) {
  const params: UnitParams = {
    page,
    ...filters,
  };

  return useBaseList<UnitEntry, UnitParams>({
    queryKey: queryKeys.unit.list(params),
    fetcher: (p) => unitService.getPaginated(p),
    params,
  });
}
