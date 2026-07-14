import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { defaultType, TypeFormData, validateType } from "../pockets.types";
import { typeService } from "../pockets.service";

export function useTypeForm(typeId?: string, enabled: boolean = true) {
  return useBaseForm<TypeFormData>({
    id: typeId,
    enabled: enabled,
    entityName: "type",
    defaultValues: defaultType,
    queryKey: queryKeys.type.detail(typeId || ""),
    invalidateQueryKey: queryKeys.type.lists(),

    getDetail: async (id) => {
      const data = await typeService.getDetail(id);
      return data as any;
    },

    createFn: typeService.create,
    updateFn: typeService.update,
    validate: validateType,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      fetchError: "Failed to load category data",
    },
  });
}
