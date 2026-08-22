import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { unitService } from "../unit.service";
import { UnitEntry } from "../unit.types";

export function useUnitAll() {
  return useBaseAll<UnitEntry>({
    queryKey: queryKeys.unit.all(),
    fetcher: unitService.getAll,
  });
}
