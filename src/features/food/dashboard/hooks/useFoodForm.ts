import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { foodService } from "../service/food.service";
import { defaultFood, FoodFormData, validateFood } from "../food.types";

export function useFoodForm(foodId?: string) {
  return useBaseForm<FoodFormData>({
    id: foodId,
    entityName: "food",
    defaultValues: defaultFood,
    queryKey: queryKeys.food.detail(foodId || ""),
    invalidateQueryKey: [
      ...queryKeys.restaurants.all(),
      ...queryKeys.food.all(),
    ],

    getDetail: async (id) => {
      const data = await foodService.getDetail(id);
      return data as any;
    },

    createFn: foodService.create,
    updateFn: foodService.update,
    validate: validateFood,
    redirectTo: "/food/dashboard",

    messages: {
      createSuccess: "Food created successfully",
      updateSuccess: "Food updated successfully",
      fetchError: "Failed to load food data",
    },
  });
}
