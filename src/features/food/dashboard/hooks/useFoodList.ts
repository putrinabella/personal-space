import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { foodService } from "../service/food.service";
import { PaginatedParams } from "@/shared/types/common";

export function useFoodsList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<FoodEntry, PaginatedParams>({
    queryKey: queryKeys.food.list(params),
    fetcher: (p) => foodService.getPaginated(p),
    params,
  });
}
