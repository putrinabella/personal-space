import { useBaseList } from "@/shared/hooks/core/use-base-list";
import { queryKeys } from "@/lib/queryKeys";
import { accountsService } from "../accounts.service";
import { PaginatedParams } from "@/shared/types/common";
import { AccountsEntry } from "../accounts.types";

export function useAccountsList(page = 1, title?: string, enabled = true) {
  const params: PaginatedParams = {
    page,
    search: title,
  };

  return useBaseList<AccountsEntry, PaginatedParams>({
    queryKey: queryKeys.accounts.list(params),
    fetcher: (p) => accountsService.getPaginated(p),
    params,
    enabled,
  });
}
