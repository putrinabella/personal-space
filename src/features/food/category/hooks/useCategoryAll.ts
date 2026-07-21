import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { CategoryEntry } from "../category.types";
import { queryKeys } from "@/lib/queryKeys";
import { categoryService } from "../category.service";

export function useCategoryAll() {
  return useBaseAll<CategoryEntry>({
    queryKey: queryKeys.category.all(),

    fetcher: categoryService.getAll,
  });
}
