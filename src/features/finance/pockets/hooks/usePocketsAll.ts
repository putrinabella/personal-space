import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { pocketsService } from "../pockets.service";
import { PocketsEntry } from "../pockets.types";

export function usePocketsAll() {
  return useBaseAll<PocketsEntry>({
    queryKey: queryKeys.pockets.all(),

    fetcher: pocketsService.getAll,
  });
}
