import { useBaseDetail } from "@/shared/hooks/core/use-base-detail";
import { AccountsEntry } from "../accounts.types";
import { queryKeys } from "@/lib/queryKeys";
import { accountsService } from "../accounts.service";

export function useAccountDetail(accountId?: string) {
  return useBaseDetail<AccountsEntry>({
    id: accountId,

    queryKey: queryKeys.accounts.detail(accountId || ""),

    fetcher: accountsService.getDetail,
  });
}
