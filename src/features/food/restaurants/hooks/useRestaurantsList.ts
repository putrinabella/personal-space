import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { restaurantsService } from "../restaurants.service";
import { PaginatedParams } from "@/shared/types/common";
import { restaurantsTypes } from "../restaurants.types";

export function useRestaurantsList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<restaurantsTypes, PaginatedParams>({
    queryKey: queryKeys.restaurants.list(params),
    fetcher: (p) => restaurantsService.getPaginated(p),
    params,
  });
}
