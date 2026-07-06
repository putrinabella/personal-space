import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { PaginatedParams } from "@/shared/types/common";
import { discoverService } from "../service/discover.service";

export function useDiscoverFoodsList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<FoodEntry, PaginatedParams>({
    queryKey: queryKeys.food.list(params),
    fetcher: (p) => discoverService.getPaginated(p),
    params,
  });
}
