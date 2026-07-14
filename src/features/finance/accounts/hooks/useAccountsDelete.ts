import { queryKeys } from "@/lib/queryKeys";
import { accountsService } from "../accounts.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useAccountsDelete() {
  return useBaseDelete({
    entityName: "Accounts",

    mutationFn: accountsService.delete,

    invalidateQueryKey: queryKeys.accounts.lists(),

    messages: {
      deleteSuccess: "Accounts deleted successfully",
    },
  });
}
