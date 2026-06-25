import { createCrudService } from "@/shared/service/createCrudService";
import { CuisinesItem } from "./cuisines.types";

export const cuisinesService = createCrudService<CuisinesItem>(
  "/api/food/cuisines",
  {
    tag: "cuisines",
  },
);
