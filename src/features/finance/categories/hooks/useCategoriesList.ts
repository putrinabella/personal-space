import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { categoriesService } from "../categories.service";
import { PaginatedParams } from "@/shared/types/common";
import { CategoriesEntry } from "../categories.types";

export function useCategoriesList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    per_page: 1000,
    search: title,
  };

  return useBaseList<CategoriesEntry, PaginatedParams>({
    queryKey: queryKeys.categories.list(params),
    fetcher: (p) => categoriesService.getPaginated(p),
    params,
    enabled,
  });
}
