import { useBaseDetail } from "@/shared/hooks/core/use-base-detail";
import { PocketsEntry } from "../pockets.types";
import { queryKeys } from "@/lib/queryKeys";
import { pocketsService } from "../pockets.service";

export function usePocketDetail(pocketId?: string) {
  return useBaseDetail<PocketsEntry>({
    id: pocketId,

    queryKey: queryKeys.pockets.detail(pocketId || ""),

    fetcher: pocketsService.getDetail,
  });
}
