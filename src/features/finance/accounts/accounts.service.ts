import { createCrudService } from "@/shared/service/createCrudService";
import { AccountsEntry } from "./accounts.types";

export const accountsService = createCrudService<AccountsEntry>(
  "/api/finance/accounts",
  {
    tag: "accounts",
  },
);
