import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import {
  defaultPockets,
  PocketsFormData,
  validatePockets,
} from "../pockets.types";
import { pocketsService } from "../pockets.service";

export function usePocketsForm(pocketsId?: string, enabled: boolean = true) {
  return useBaseForm<PocketsFormData>({
    id: pocketsId,
    enabled: enabled,
    entityName: "pockets",
    defaultValues: defaultPockets,
    queryKey: queryKeys.pockets.detail(pocketsId || ""),
    invalidateQueryKey: queryKeys.pockets.lists(),

    getDetail: async (id) => {
      const data = await pocketsService.getDetail(id);
      return data as any;
    },

    createFn: pocketsService.create,
    updateFn: pocketsService.update,
    validate: validatePockets,
    redirectTo: "/finance/settings",

    messages: {
      createSuccess: "Pocket created successfully",
      updateSuccess: "Pocket updated successfully",
      fetchError: "Failed to load pocket data",
    },
  });
}
