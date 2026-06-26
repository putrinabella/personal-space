import { createCrudService } from "@/shared/service/createCrudService";
import { diningTypes } from "./dining.types";

export const diningTypesService = createCrudService<diningTypes>(
  "/api/food/diningTypes",
  {
    tag: "diningTypes",
  },
);
