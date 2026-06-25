import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { CategoriesItem } from "../categories.types";
import { categoriesService } from "../categories.service";
import { PaginatedParams } from "@/shared/types/common";

export function useCategoriesList(page = 1, title?: string) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<CategoriesItem, PaginatedParams>({
    queryKey: queryKeys.categories.list(params),
    // Sekarang ini tidak akan error lagi
    fetcher: (p) => categoriesService.getPaginated(p),
    params,
  });
}
