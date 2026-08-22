import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { itemsService } from "../product.service";
import { ProductEntry } from "../product.types";

export function useProductAll() {
  return useBaseAll<ProductEntry>({
    queryKey: queryKeys.items.all(),
    fetcher: itemsService.getAll,
  });
}
