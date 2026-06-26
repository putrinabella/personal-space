import { createCrudService } from "@/shared/service/createCrudService";
import { cuisinesTypes } from "./cuisines.types";

export const cuisinesService = createCrudService<cuisinesTypes>(
  "/api/food/cuisines",
  {
    tag: "cuisines",
  },
);
