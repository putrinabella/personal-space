import { createCrudService } from "@/shared/service/createCrudService";
import { DiningTypesEntry } from "./dining.types";

export const diningTypeService = createCrudService<DiningTypesEntry>(
  "/api/food/diningTypes",
  {
    tag: "DiningTypesEntry",
  },
);
