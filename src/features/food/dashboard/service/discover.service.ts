import { createCrudService } from "@/shared/service/createCrudService";
import { FoodEntry } from "../food.types";

export const discoverService = createCrudService<FoodEntry>(
  "/api/discover-foods",
  {
    tag: "discover-foods",
  },
);

export const randomFoodService = createCrudService<FoodEntry>(
  "/api/discover-foods?random=true",
  { tag: "discover-foods" },
);
