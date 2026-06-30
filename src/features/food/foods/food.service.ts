import { createCrudService } from "@/shared/service/createCrudService";
import { FoodEntry } from "./food.types";

export const foodService = createCrudService<FoodEntry>("/api/food", {
  tag: "food",
});
