import { queryKeys } from "@/lib/queryKeys";
import { restaurantsService } from "../restaurants.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useRestaurantsDelete() {
  return useBaseDelete({
    entityName: "Restaurants",

    mutationFn: restaurantsService.delete,

    invalidateQueryKey: queryKeys.restaurants.lists(),

    messages: {
      deleteSuccess: "Restaurant deleted successfully",
    },
  });
}
