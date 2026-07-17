import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { transactionService } from "../transaction.service";
import { TransactionEntry } from "../transaction.types";

export function useTransactionAll() {
  return useBaseAll<TransactionEntry>({
    queryKey: queryKeys.transaction.all,

    fetcher: transactionService.getAll,
  });
}
