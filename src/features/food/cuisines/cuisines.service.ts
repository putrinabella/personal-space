import { createCrudService } from "@/shared/service/createCrudService";
import { CuisinesEntry } from "./cuisines.types";

export const cuisinesService = createCrudService<CuisinesEntry>(
  "/api/food/cuisines",
  {
    tag: "cuisines",
  },
);
