import { createCrudService } from "@/shared/service/createCrudService";
import { BudgetsEntry } from "./budgets.types";

export const budgetsService = createCrudService<BudgetsEntry>(
  "/api/finance/budgets",
  {
    tag: "budgets",
  },
);
