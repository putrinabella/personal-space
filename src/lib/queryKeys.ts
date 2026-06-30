import { createQueryKeys } from "./queryKeyFactory";

export const queryKeys = {
  categories: createQueryKeys("categories"),
  cuisines: createQueryKeys("cuisines"),
  DiningTypesEntry: createQueryKeys("DiningTypesEntry"),
  tags: createQueryKeys("tags"),
  restaurants: createQueryKeys("restaurants"),
};
