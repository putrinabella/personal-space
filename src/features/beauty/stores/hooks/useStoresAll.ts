import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { storesService } from "../stores.service";
import { StoresEntry } from "../stores.types";

export function useStoresAll() {
  return useBaseAll<StoresEntry>({
    queryKey: queryKeys.stores.all(),
    fetcher: storesService.getAll,
  });
}
