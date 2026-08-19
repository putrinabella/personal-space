import { queryKeys } from "@/lib/queryKeys";
import { defaultItems, ItemsFormData, validateItems } from "../items.types";
import { itemsService } from "../items.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";

export function useItemsForm(itemsId?: string, enabled: boolean = true) {
  return useHouseholdWithAuthForm<ItemsFormData>({
    id: itemsId,
    enabled,
    entityName: "items",
    defaultValues: defaultItems,
    queryKey: queryKeys.items.detail(itemsId || ""),
    invalidateQueryKey: queryKeys.items.lists(),

    getDetail: async (id: string) => await itemsService.getDetail(id),
    createFn: itemsService.create,
    updateFn: itemsService.update,
    validate: validateItems,
    redirectTo: "/beauty/dashboard",
    messages: {
      createSuccess: "Item created successfully",
      updateSuccess: "Item updated successfully",
      fetchError: "Failed to load item data",
    },
  });
}
