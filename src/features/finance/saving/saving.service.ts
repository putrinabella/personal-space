import { createCrudService } from "@/shared/service/createCrudService";
import { SavingEntry } from "./saving.types";

export const savingService = createCrudService<SavingEntry>(
  "/api/finance/saving",
  {
    tag: "saving",
  },
);
