import { createCrudService } from "@/shared/service/createCrudService";
import { categoriesTypes } from "./categories.types";

export const categoriesService = createCrudService<categoriesTypes>(
  "/api/food/categories",
  {
    tag: "categories",
  },
);
