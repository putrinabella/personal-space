import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { itemsService } from "../items.service";
import { ItemsEntry } from "../items.types";

export function useItemsAll() {
  return useBaseAll<ItemsEntry>({
    queryKey: queryKeys.items.all(),
    fetcher: itemsService.getAll,
  });
}
