import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { wasteService } from "../waste.service";
import { WasteEntry } from "../waste.types";

export function useWasteAll() {
  return useBaseAll<WasteEntry>({
    queryKey: queryKeys.waste.all(),
    fetcher: wasteService.getAll,
  });
}
