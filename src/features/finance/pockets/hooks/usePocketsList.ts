import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { TypeEntry } from "../pockets.types";
import { typeService } from "../pockets.service";
import { PaginatedParams } from "@/shared/types/common";

export function useTypeList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<TypeEntry, PaginatedParams>({
    queryKey: queryKeys.type.list(params),
    fetcher: (p) => typeService.getPaginated(p),
    params,
    enabled,
  });
}
