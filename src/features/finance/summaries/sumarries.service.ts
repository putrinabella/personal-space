import { createCrudService } from "@/shared/service/createCrudService";
import { SumarriesEntry } from "./sumarries.types";

export const summariesService = createCrudService<SumarriesEntry>(
  "/api/finance/summaries",
  {
    tag: "summaries",
  },
);
