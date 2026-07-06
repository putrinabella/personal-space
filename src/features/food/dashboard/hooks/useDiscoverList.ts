import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { PaginatedParams } from "@/shared/types/common";
import { discoverService } from "../service/discover.service";

// export function useDiscoverFoodsLista(page = 1, title?: string) {
//   const params: PaginatedParams = {
//     page,
//     search: title,
//   };

//   return useBaseList<FoodEntry, PaginatedParams>({
//     queryKey: queryKeys.food.list(params),
//     fetcher: (p) => discoverService.getPaginated(p),
//     params,
//   });
// }

export interface DiscoverFoodsParams extends PaginatedParams {
  restaurantId?: string;
  categoryId?: string;
  cuisineId?: string;
  diningTypeId?: string;
  keyword?: string;
  isFavorite?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
}

export function useDiscoverFoodsList(
  page = 1,
  filters: Partial<DiscoverFoodsParams> = {},
) {
  const params: DiscoverFoodsParams = {
    page,
    ...filters,
  };

  return useBaseList<FoodEntry, DiscoverFoodsParams>({
    queryKey: queryKeys.food.list(params),
    fetcher: (p) => discoverService.getPaginated(p),
    params,
  });
}
