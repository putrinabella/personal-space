import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { brandsService } from "../waste.service";
import { BrandsEntry } from "../waste.types";

export function useBrandsAll() {
  return useBaseAll<BrandsEntry>({
    queryKey: queryKeys.brands.all(),
    fetcher: brandsService.getAll,
  });
}
