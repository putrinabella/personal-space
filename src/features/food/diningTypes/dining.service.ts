import { createCrudService } from "@/shared/service/createCrudService";
import { DiningTypesEntry } from "./dining.types";

export const DiningTypesEntryService = createCrudService<DiningTypesEntry>(
  "/api/food/DiningTypesEntry",
  {
    tag: "DiningTypesEntry",
  },
);
