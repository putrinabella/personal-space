import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { wasteService } from "../waste.service";
import { PaginatedParams } from "@/shared/types/common";
import { WasteEntry } from "../waste.types";

export function useWasteList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    per_page: 1000,
    search: title,
  };

  return useBaseList<WasteEntry, PaginatedParams>({
    queryKey: queryKeys.waste.list(params),
    fetcher: (p) => wasteService.getPaginated(p),
    params,
    enabled,
  });
}
