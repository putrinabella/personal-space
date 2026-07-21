import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { transactionService } from "../transaction.service";
import { PaginatedParams } from "@/shared/types/common";
import { TransactionEntry } from "../transaction.types";

export interface TransactionParams extends PaginatedParams {
  accountId?: string;
  pocketId?: string;
  categoryId?: string;
  type?: string;
  search?: string;
  status?: string;
  month?: string;
}

export function useTransactionList(
  page = 1,
  filters: Partial<TransactionParams> = {},
) {
  const params: TransactionParams = {
    page,
    ...filters,
  };

  return useBaseList<TransactionEntry, TransactionParams>({
    queryKey: queryKeys.food.list(params),
    fetcher: (p) => transactionService.getPaginated(p),
    params,
  });
}

export function useTransactionList2(page = 1, title?: string, enabled = true) {
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
