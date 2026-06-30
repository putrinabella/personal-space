import { createQueryKeys } from "./queryKeyFactory";

export const queryKeys = {
  categories: createQueryKeys("categories"),
  cuisines: createQueryKeys("cuisines"),
  diningTypes: createQueryKeys("diningType"),
  tags: createQueryKeys("tags"),
  restaurants: createQueryKeys("restaurants"),
  log: createQueryKeys("food-logs"),
  food: createQueryKeys("food"),
};
