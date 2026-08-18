import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { brandsService } from "../brands.service";
import { PaginatedParams } from "@/shared/types/common";
import { BrandsEntry } from "../brands.types";

export function useBrandsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    per_page: 1000,
    search: title,
  };

  return useBaseList<BrandsEntry, PaginatedParams>({
    queryKey: queryKeys.brands.list(params),
    fetcher: (p) => brandsService.getPaginated(p),
    params,
    enabled,
  });
}
