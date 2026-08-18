import { queryKeys } from "@/lib/queryKeys";
import { defaultStores, StoresFormData, validateStores } from "../stores.types";
import { storesService } from "../stores.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useStoresForm(storesId?: string, enabled: boolean = true) {
  return useHouseholdForm<StoresFormData>({
    id: storesId,
    enabled,
    entityName: "stores",
    defaultValues: defaultStores,
    queryKey: queryKeys.stores.detail(storesId || ""),
    invalidateQueryKey: queryKeys.stores.lists(),

    getDetail: async (id: string) => await storesService.getDetail(id),
    createFn: storesService.create,
    updateFn: storesService.update,
    validate: validateStores,
    redirectTo: "/beauty/settings",
    messages: {
      createSuccess: "Store created successfully",
      updateSuccess: "Store updated successfully",
      fetchError: "Failed to load store data",
    },
  });
}
