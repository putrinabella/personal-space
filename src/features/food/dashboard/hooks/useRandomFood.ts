import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { FoodEntry } from "../food.types";
import { randomFoodService } from "../service/discover.service";

// export function useRandomFood(enabled: boolean = false) {
//   return useBaseAll<FoodEntry>({
//     // Gunakan factory agar rapi dan unik
//     queryKey: [...queryKeys.discoverFoods.all, "random"],
//     fetcher: randomFoodService.getAll,
//     // Teruskan status 'enabled' ke dalam options
//     options: {
//       enabled: enabled,
//       // Tambahkan staleTime 0 agar setiap kali 'Roll Again' ditekan,
//       // dia benar-benar mengambil data baru (bukan dari cache lama)
//       staleTime: 0,
//     },
//   });
// }

export function useRandomFood(
  enabled: boolean = false,
  filters: any = {}, // Tambahkan argumen filters
) {
  return useBaseAll<FoodEntry>({
    // Masukkan filters ke dalam queryKey agar cache berubah saat filter berubah
    queryKey: [...queryKeys.discoverFoods.all, "random", filters],

    // Kirim filters ke randomFoodService.getAll
    fetcher: () => randomFoodService.getAll(filters),

    options: {
      enabled: enabled,
      staleTime: 0,
    },
  });
}
