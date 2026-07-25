import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { SumarriesEntry } from "../sumarries.types";
import { summariesService } from "../sumarries.service";

export interface SumarriesFilterParams {
  year?: string;
  month?: string;
}

export function useSumarriesAll(
  filters: Partial<SumarriesFilterParams> = {},
  options?: { enabled?: boolean },
) {
  return useBaseAll<SumarriesEntry, Partial<SumarriesEntry>>({
    queryKey: queryKeys.transaction.all(filters),
    fetcher: (params) => summariesService.getAll(params),
    params: filters,
    enabled: options?.enabled,
  });
}
