import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { accountsService } from "../accounts.service";
import { AccountsEntry } from "../accounts.types";

export function useAccountsAll() {
  return useBaseAll<AccountsEntry>({
    queryKey: queryKeys.accounts.all,

    fetcher: accountsService.getAll,
  });
}
