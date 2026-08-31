import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { wishlistService } from "../wishlist.service";
import { PaginatedParams } from "@/shared/types/common";
import { WishlistEntry } from "../wishlist.types";

export interface WishlistParams extends PaginatedParams {
  categoryId?: string;
  brandId?: string;
  storeId?: string;
  status?: string;
  concernId?: string;
  expiryWindow?: string;
  stockStatus?: string;
  search?: string;
}

export function useWishlistList(
  page = 1,
  filters: Partial<WishlistParams> = {},
) {
  const params: WishlistParams = {
    page,
    ...filters,
  };

  return useBaseList<WishlistEntry, WishlistParams>({
    queryKey: queryKeys.items.list(params),
    fetcher: (p) => wishlistService.getPaginated(p),
    params,
  });
}
