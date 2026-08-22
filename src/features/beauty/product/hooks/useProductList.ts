import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { productService } from "../product.service";
import { PaginatedParams } from "@/shared/types/common";
import { ProductEntry } from "../product.types";

export interface ProductParams extends PaginatedParams {
  categoryId?: string;
  brandId?: string;
  storeId?: string;
  status?: string;
  concernId?: string;
  expiryWindow?: string;
  stockStatus?: string;
  search?: string;
}

export function useProductList(page = 1, filters: Partial<ProductParams> = {}) {
  const params: ProductParams = {
    page,
    ...filters,
  };

  return useBaseList<ProductEntry, ProductParams>({
    queryKey: queryKeys.items.list(params),
    fetcher: (p) => productService.getPaginated(p),
    params,
  });
}
