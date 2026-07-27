import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { restaurantsService } from "../restaurants.service";
import {
  defaultRestaurants,
  validateRestaurants,
  RestaurantFormData,
} from "../restaurants.types";

export function useRestaurantsForm(restaurantsId?: string) {
  return useBaseForm<RestaurantFormData>({
    id: restaurantsId,
    entityName: "restaurants",
    defaultValues: defaultRestaurants,
    queryKey: queryKeys.restaurants.detail(restaurantsId || ""),
    invalidateQueryKey: [
      ...queryKeys.restaurants.lists(),
      ...queryKeys.restaurants.all(),
      ...queryKeys.discoverFoods.lists(),
      ...queryKeys.food.all(),
    ],
    getDetail: async (id) => {
      const data = await restaurantsService.getDetail(id);
      return data as any;
    },

    createFn: restaurantsService.create,
    updateFn: restaurantsService.update,
    validate: validateRestaurants,
    redirectTo: "/food/restaurant",

    messages: {
      createSuccess: "Restaurant created successfully",
      updateSuccess: "Restaurant updated successfully",
      fetchError: "Failed to load restaurant data",
    },
  });
}
