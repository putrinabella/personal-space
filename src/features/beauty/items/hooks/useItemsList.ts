import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { itemsService } from "../items.service";
import { PaginatedParams } from "@/shared/types/common";
import { ItemsEntry } from "../items.types";

export interface ItemsParams extends PaginatedParams {
  categoryId?: string;
  brandId?: string;
  storeId?: string;
  status?: string;
  concernId?: string;
  expiryWindow?: string;
  stockStatus?: string;
  search?: string;
}

export function useItemsList(page = 1, filters: Partial<ItemsParams> = {}) {
  const params: ItemsParams = {
    page,
    ...filters,
  };

  return useBaseList<ItemsEntry, ItemsParams>({
    queryKey: queryKeys.items.list(params),
    fetcher: (p) => itemsService.getPaginated(p),
    params,
  });
}
