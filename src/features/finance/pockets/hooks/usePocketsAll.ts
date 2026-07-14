import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { TypeEntry } from "../pockets.types";
import { typeService } from "../pockets.service";

export function useTypeAll() {
  return useBaseAll<TypeEntry>({
    queryKey: queryKeys.type.all,

    fetcher: typeService.getAll,
  });
}
