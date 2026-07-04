import { createCrudService } from "@/shared/service/createCrudService";
import { DiningTypeEntry } from "./dining.types";

export const diningTypeService = createCrudService<DiningTypeEntry>(
  "/api/food/diningType",
  {
    tag: "DiningTypeEntry",
  },
);
