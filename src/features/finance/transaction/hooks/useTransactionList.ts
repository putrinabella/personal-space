import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { transactionService } from "../transaction.service";
import { PaginatedParams } from "@/shared/types/common";
import { TransactionEntry } from "../transaction.types";

export function useTransactionList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<TransactionEntry, PaginatedParams>({
    queryKey: queryKeys.transaction.list(params),
    fetcher: (p) => transactionService.getPaginated(p),
    params,
    enabled,
  });
}
