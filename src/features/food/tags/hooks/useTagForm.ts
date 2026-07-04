import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { defaultTag, TagFormData, validateTag } from "../tags.types";
import { tagsService } from "../tags.service";

export function useTagForm(tagId?: string, enabled: boolean = true) {
  return useBaseForm<TagFormData>({
    id: tagId,
    enabled: enabled,
    entityName: "tag",
    defaultValues: defaultTag,
    queryKey: queryKeys.tags.detail(tagId || ""),
    invalidateQueryKey: queryKeys.tags.lists(),

    getDetail: async (id) => {
      const data = await tagsService.getDetail(id);
      return data as any;
    },

    createFn: tagsService.create,
    updateFn: tagsService.update,
    validate: validateTag,
    redirectTo: "/food/settings",

    messages: {
      createSuccess: "Kategori berhasil dibuat",
      updateSuccess: "Kategori berhasil diperbarui",
      fetchError: "Tidak dapat mengambil data kategori",
    },
  });
}
