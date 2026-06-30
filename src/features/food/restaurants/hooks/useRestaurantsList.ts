import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { restaurantsService } from "../restaurants.service";
import { PaginatedParams } from "@/shared/types/common";
import { RestaurantEntry } from "../restaurants.types";

export interface RestaurantsFilterParams extends PaginatedParams {
  search?: string;
  isFavoriteRestaurant?: string;
}

export function useRestaurantsList(
  page = 1,
  filters: Partial<RestaurantsFilterParams> = {},
) {
  const params: RestaurantsFilterParams = {
    page,
    ...filters,
  };

  return useBaseList<RestaurantEntry, RestaurantsFilterParams>({
    queryKey: queryKeys.restaurants.list(params),
    fetcher: (p) => restaurantsService.getPaginated(p),
    params,
  });
}
