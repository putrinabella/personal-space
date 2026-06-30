import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { foodService } from "../food.service";

// export function useFoodAll() {
//   return useBaseAll<FoodEntry>({
//     queryKey: queryKeys.food.all,

//     fetcher: foodService.getAll,
//   });
// }
// features/food/foods/hooks/useFoodAll.ts
export function useFoodAll(restaurantId?: string) {
  return useBaseAll<FoodEntry>({
    // Tambahkan restaurantId ke queryKey agar data ter-cache per restoran
    queryKey: [...queryKeys.food.all, restaurantId],

    // Kirim restaurantId ke fetcher
    fetcher: () => foodService.getAll({ restaurantId }),

    // Query hanya jalan kalau restaurantId ada (opsional)
    options: {
      enabled: !!restaurantId,
    },
  });
}
