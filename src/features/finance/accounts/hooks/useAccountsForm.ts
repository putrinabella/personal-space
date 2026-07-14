import { queryKeys } from "@/lib/queryKeys";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";
import {
  defaultAccounts,
  AccountsFormData,
  validateAccounts,
} from "../accounts.types";
import { accountsService } from "../accounts.service";

export function useAccountsForm(accountsId?: string, enabled: boolean = true) {
  return useBaseForm<AccountsFormData>({
    id: accountsId,
    enabled: enabled,
    entityName: "accounts",
    defaultValues: defaultAccounts,
    queryKey: queryKeys.accounts.detail(accountsId || ""),
    invalidateQueryKey: queryKeys.accounts.lists(),

    getDetail: async (id) => {
      const data = await accountsService.getDetail(id);
      return data as any;
    },

    createFn: accountsService.create,
    updateFn: accountsService.update,
    validate: validateAccounts,
    redirectTo: "/finance/settings",

    messages: {
      createSuccess: "Account created successfully",
      updateSuccess: "Account updated successfully",
      fetchError: "Failed to load account data",
    },
  });
}
