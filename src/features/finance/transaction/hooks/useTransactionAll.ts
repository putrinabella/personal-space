import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { transactionService } from "../transaction.service";
import { TransactionEntry } from "../transaction.types";
import { TransactionParams } from "./useTransactionList";

export function useTransactionAll(
  filters: Partial<TransactionParams> = {},
  options?: { enabled?: boolean },
) {
  return useBaseAll<TransactionEntry, Partial<TransactionParams>>({
    queryKey: queryKeys.transaction.all(filters),
    fetcher: (params) => transactionService.getAll(params),
    params: filters,
    enabled: options?.enabled,
  });
}
