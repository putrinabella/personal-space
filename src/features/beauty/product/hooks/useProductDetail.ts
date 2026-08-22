import { useBaseDetail } from "@/shared/hooks/core/use-base-detail";

import { queryKeys } from "@/lib/queryKeys";
import { ProductEntry } from "../product.types";
import { productService } from "../product.service";

export function useProductDetail(budgetId?: string) {
  return useBaseDetail<ProductEntry>({
    id: budgetId,

    queryKey: queryKeys.items.detail(budgetId || ""),

    fetcher: productService.getDetail,
  });
}
