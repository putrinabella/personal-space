import { queryKeys } from "@/lib/queryKeys";
import {
  defaultAccounts,
  AccountsFormData,
  validateAccounts,
} from "../accounts.types";
import { accountsService } from "../accounts.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useAccountsForm(accountsId?: string, enabled: boolean = true) {
  return useHouseholdForm<AccountsFormData>({
    id: accountsId,
    enabled,
    entityName: "accounts",
    defaultValues: defaultAccounts,
    queryKey: queryKeys.accounts.detail(accountsId || ""),
    invalidateQueryKey: queryKeys.accounts.lists(),

    getDetail: async (id: string) => await accountsService.getDetail(id),
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
