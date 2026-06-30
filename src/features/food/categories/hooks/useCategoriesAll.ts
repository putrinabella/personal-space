import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { CategoriesEntry } from "../categories.types";
import { queryKeys } from "@/lib/queryKeys";
import { categoriesService } from "../categories.service";

export function useCategoriesAll() {
  return useBaseAll<CategoriesEntry>({
    queryKey: queryKeys.categories.all,

    fetcher: categoriesService.getAll,
  });
}
