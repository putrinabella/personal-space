import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { pocketsService } from "../pockets.service";
import { PocketsEntry } from "../pockets.types";

export interface PocketParams {
  type?: string;
  search?: string;
}

export function usePocketAll(
  filters: Partial<PocketParams> = {},
  options?: { enabled?: boolean },
) {
  return useBaseAll<PocketsEntry, Partial<PocketParams>>({
    queryKey: queryKeys.pockets.all(filters),
    fetcher: (params) => pocketsService.getAll(params),
    params: filters,
    enabled: options?.enabled,
  });
}
