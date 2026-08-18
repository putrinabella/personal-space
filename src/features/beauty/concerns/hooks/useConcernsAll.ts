import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { concernsService } from "../concerns.service";
import { ConcernsEntry } from "../concerns.types";

export function useConcernsAll() {
  return useBaseAll<ConcernsEntry>({
    queryKey: queryKeys.concerns.all(),
    fetcher: concernsService.getAll,
  });
}
