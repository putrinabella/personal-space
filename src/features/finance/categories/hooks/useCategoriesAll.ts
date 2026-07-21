import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { categoriesService } from "../categories.service";
import { CategoriesEntry } from "../categories.types";

export function useCategoriesAll() {
  return useBaseAll<CategoriesEntry>({
    queryKey: queryKeys.categories.all(),
    fetcher: categoriesService.getAll,
  });
}
