import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { savingService } from "../saving.service";
import { SavingEntry } from "../saving.types";

export interface SavingParams {
  pocketId?: string;
  isCompleted?: string;
  search?: string;
}

export function useSavingAll(
  filters: Partial<SavingParams> = {},
  options?: { enabled?: boolean },
) {
  return useBaseAll<SavingEntry, Partial<SavingParams>>({
    queryKey: queryKeys.saving.all(filters),
    fetcher: (params) => savingService.getAll(params),
    params: filters,
    enabled: options?.enabled,
  });
}
