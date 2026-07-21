import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { DiningTypeEntry } from "../dining.types";
import { diningTypeService } from "../dining.service";

export function useDiningTypeAll() {
  return useBaseAll<DiningTypeEntry>({
    queryKey: queryKeys.diningType.all(),

    fetcher: diningTypeService.getAll,
  });
}
