import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { CategoryEntry } from "../category.types";
import { categoryService } from "../category.service";
import { PaginatedParams } from "@/shared/types/common";

export function useCategoryList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<CategoryEntry, PaginatedParams>({
    queryKey: queryKeys.category.list(params),
    fetcher: (p) => categoryService.getPaginated(p),
    params,
    enabled,
  });
}
