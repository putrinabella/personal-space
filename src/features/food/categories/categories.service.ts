import { createCrudService } from "@/shared/service/createCrudService";
import { CategoriesItem } from "./categories.types";

export const categoriesService = createCrudService<CategoriesItem>(
  "/api/food/categories",
  {
    tag: "categories",
  },
);
