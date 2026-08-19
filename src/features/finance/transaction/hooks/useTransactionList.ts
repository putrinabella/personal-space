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
