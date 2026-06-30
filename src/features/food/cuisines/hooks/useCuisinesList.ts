import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { CuisinesEntry } from "../cuisines.types";
import { cuisinesService } from "../cuisines.service";
import { PaginatedParams } from "@/shared/types/common";

export function useCuisinesList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<CuisinesEntry, PaginatedParams>({
    queryKey: queryKeys.cuisines.list(params),
    // Sekarang ini tidak akan error lagi
    fetcher: (p) => cuisinesService.getPaginated(p),
    params,
  });
}
