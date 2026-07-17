import { queryKeys } from "@/lib/queryKeys";
import { transactionService } from "../transaction.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useTransactionDelete() {
  return useBaseDelete({
    entityName: "Transaction",

    mutationFn: transactionService.delete,

    invalidateQueryKey: queryKeys.transaction.lists(),

    messages: {
      deleteSuccess: "Transaction deleted successfully",
    },
  });
}
