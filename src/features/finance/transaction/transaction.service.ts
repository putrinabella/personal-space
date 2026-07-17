import { createCrudService } from "@/shared/service/createCrudService";
import { TransactionEntry } from "./transaction.types";

export const transactionService = createCrudService<TransactionEntry>(
  "/api/finance/transactions",
  {
    tag: "transaction",
  },
);
