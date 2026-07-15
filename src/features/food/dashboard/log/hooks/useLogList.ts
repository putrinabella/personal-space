import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { LogEntry } from "../log.types";
import { logService } from "../log.service";
import { PaginatedParams } from "@/shared/types/common";

export function useLogsList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<LogEntry, PaginatedParams>({
    queryKey: queryKeys.log.list(params),
    fetcher: (p) => logService.getPaginated(p),
    params,
  });
}
