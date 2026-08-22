import { createQueryKeys } from "./queryKeyFactory";

export const queryKeys = {
  // food keys
  category: createQueryKeys("category"),
  cuisines: createQueryKeys("cuisines"),
  diningType: createQueryKeys("diningType"),
  tags: createQueryKeys("tags"),
  restaurants: createQueryKeys("restaurants"),
  log: createQueryKeys("food-logs"),
  food: createQueryKeys("food"),
  discoverFoods: createQueryKeys("discover-foods"),

  // finance keys
  categories: createQueryKeys("categories"),
  pockets: createQueryKeys("pockets"),
  accounts: createQueryKeys("accounts"),
  transaction: createQueryKeys("transaction"),
  summaries: createQueryKeys("summaries"),
  budgets: createQueryKeys("budgets"),
  saving: createQueryKeys("saving"),

  // beauty keys
  stores: createQueryKeys("stores"),
  categoriesBeauty: createQueryKeys("categories-beauty"),
  brands: createQueryKeys("brands"),
  concerns: createQueryKeys("concerns"),
  items: createQueryKeys("items"),
  unit: createQueryKeys("unit"),
};
