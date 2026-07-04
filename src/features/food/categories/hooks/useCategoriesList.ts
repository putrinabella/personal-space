import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { CategoriesEntry } from "../categories.types";
import { categoriesService } from "../categories.service";
import { PaginatedParams } from "@/shared/types/common";

export function useCategoriesList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<CategoriesEntry, PaginatedParams>({
    queryKey: queryKeys.categories.list(params),
    // Sekarang ini tidak akan error lagi
    fetcher: (p) => categoriesService.getPaginated(p),
    params,
    enabled,
  });
}
