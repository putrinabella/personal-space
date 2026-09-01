import { queryKeys } from "@/lib/queryKeys";
import { alertService } from "../alert.service";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { AlertEntry } from "../alert.types";

export function useAlertAll() {
  const result = useBaseAll<any>({
    queryKey: queryKeys.alert.all(),
    fetcher: alertService.getAll,
  });

  return {
    ...result,
    data: result.data as unknown as AlertEntry,
  };
}
