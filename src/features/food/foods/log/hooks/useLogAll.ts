import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { LogEntry } from "../log.types";
import { logService } from "../log.service";

export function useLogAll() {
  return useBaseAll<LogEntry>({
    queryKey: queryKeys.log.all,

    fetcher: logService.getAll,
  });
}
