import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { restaurantsService } from "../restaurants.service";
import { RestaurantEntry } from "../restaurants.types";

export function useRestaurantAll() {
  return useBaseAll<RestaurantEntry>({
    queryKey: queryKeys.restaurants.all(),

    fetcher: restaurantsService.getAll,
  });
}
