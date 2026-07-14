import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { TypeEntry } from "../type.types";
import { typeService } from "../type.service";

export function useTypeAll() {
  return useBaseAll<TypeEntry>({
    queryKey: queryKeys.type.all,

    fetcher: typeService.getAll,
  });
}
