import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { queryKeys } from "@/lib/queryKeys";
import { cuisinesService } from "../cuisines.service";
import { CuisinesEntry } from "../cuisines.types";

export function useCuisinesAll() {
  return useBaseAll<CuisinesEntry>({
    queryKey: queryKeys.cuisines.all(),

    fetcher: cuisinesService.getAll,
  });
}
