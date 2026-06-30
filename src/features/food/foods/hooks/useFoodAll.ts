import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { foodService } from "../food.service";

export function useFoodAll() {
  return useBaseAll<FoodEntry>({
    queryKey: queryKeys.food.all,

    fetcher: foodService.getAll,
  });
}
