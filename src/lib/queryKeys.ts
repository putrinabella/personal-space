import { createQueryKeys } from "./queryKeyFactory";

export const queryKeys = {
  categories: createQueryKeys("categories"),
  cuisines: createQueryKeys("cuisines"),
  diningTypes: createQueryKeys("diningTypes"),
  tags: createQueryKeys("tags"),
  restaurants: createQueryKeys("restaurants"),
};
