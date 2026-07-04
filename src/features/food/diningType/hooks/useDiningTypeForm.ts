import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import {
  defaultDiningType,
  DiningTypeFormData,
  validateDiningType,
} from "../dining.types";
import { diningTypeService } from "../dining.service";

export function useDiningTypeForm(
  diningTypeId?: string,
  enabled: boolean = true,
) {
  return useBaseForm<DiningTypeFormData>({
    id: diningTypeId,
    enabled: enabled,
    entityName: "diningType",
    defaultValues: defaultDiningType,
    queryKey: queryKeys.diningType.detail(diningTypeId || ""),
    invalidateQueryKey: queryKeys.diningType.lists(),

    getDetail: async (id) => {
      const data = await diningTypeService.getDetail(id);
      return data as any;
    },

    createFn: diningTypeService.create,
    updateFn: diningTypeService.update,
    validate: validateDiningType,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Kategori berhasil dibuat",
      updateSuccess: "Kategori berhasil diperbarui",
      fetchError: "Tidak dapat mengambil data kategori",
    },
  });
}
