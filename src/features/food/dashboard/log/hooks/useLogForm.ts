import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import { logService } from "../log.service";
import { defaultLogs, LogFormData, validateLogs } from "../log.types";

export function useLogForm(logId?: string) {
  return useBaseForm<LogFormData>({
    id: logId,
    entityName: "log",
    defaultValues: defaultLogs,
    queryKey: queryKeys.log.detail(logId || ""),
    invalidateQueryKey: queryKeys.log.lists(),

    getDetail: async (id) => {
      const data = await logService.getDetail(id);
      return data as any;
    },

    createFn: logService.create,
    updateFn: logService.update,
    validate: validateLogs,
    redirectTo: "/food",

    messages: {
      createSuccess: "Log berhasil dibuat",
      updateSuccess: "Log berhasil diperbarui",
      fetchError: "Tidak dapat mengambil data log",
    },
  });
}
