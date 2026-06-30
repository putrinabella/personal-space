import { createCrudService } from "@/shared/service/createCrudService";
import { RestaurantEntry } from "./restaurants.types";

export const restaurantsService = createCrudService<RestaurantEntry>(
  "/api/food/restaurants",
  {
    tag: "restaurants",
  },
);
