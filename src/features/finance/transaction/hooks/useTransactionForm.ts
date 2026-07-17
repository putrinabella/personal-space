import { queryKeys } from "@/lib/queryKeys";
import {
  defaultTransaction,
  TransactionFormData,
  validateTransaction,
} from "../transaction.types";
import { transactionService } from "../transaction.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";

export function useTransactionForm(
  transactionId?: string,
  enabled: boolean = true,
) {
  return useHouseholdWithAuthForm<TransactionFormData>({
    id: transactionId,
    enabled,
    entityName: "transaction",
    defaultValues: defaultTransaction,
    queryKey: queryKeys.transaction.detail(transactionId || ""),
    invalidateQueryKey: queryKeys.transaction.lists(),

    getDetail: async (id: string) => await transactionService.getDetail(id),
    createFn: transactionService.create,
    updateFn: transactionService.update,
    validate: validateTransaction,
    redirectTo: "/finance/dashboard",
    messages: {
      createSuccess: "Transaction created successfully",
      updateSuccess: "Transaction updated successfully",
      fetchError: "Failed to load transaction data",
    },
  });
}
