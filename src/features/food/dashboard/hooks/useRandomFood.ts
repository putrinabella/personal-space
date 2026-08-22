import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { randomFoodService } from "../service/discover.service";

export function useRandomFood(enabled: boolean = false, filters: any = {}) {
  return useBaseAll<FoodEntry>({
    queryKey: [...queryKeys.discoverFoods.all(), "random", filters],
    fetcher: () => randomFoodService.getAll(filters),

    options: {
      enabled: enabled,
      staleTime: 0,
    },
  });
}
