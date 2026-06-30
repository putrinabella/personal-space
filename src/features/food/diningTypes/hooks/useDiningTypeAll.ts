import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { DiningTypesEntry } from "../dining.types";
import { diningTypeService } from "../dining.service";

export function useDiningTypesAll() {
  return useBaseAll<DiningTypesEntry>({
    queryKey: queryKeys.diningTypes.all,

    fetcher: diningTypeService.getAll,
  });
}
