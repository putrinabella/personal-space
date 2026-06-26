import { createCrudService } from "@/shared/service/createCrudService";
import { restaurantsTypes } from "./restaurants.types";

export const restaurantsService = createCrudService<restaurantsTypes>(
  "/api/food/restaurants",
  {
    tag: "restaurants",
  },
);
