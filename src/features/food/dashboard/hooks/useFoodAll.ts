import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { foodService } from "../service/food.service";
export function useFoodAll(restaurantId?: string) {
  return useBaseAll<FoodEntry>({
    queryKey: [...queryKeys.food.all, restaurantId],
    fetcher: () => foodService.getAll({ restaurantId }),
    options: {
      enabled: !!restaurantId,
    },
  });
}
