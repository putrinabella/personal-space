import { createCrudService } from "@/shared/service/createCrudService";
import { CategoryEntry } from "./category.types";

export const categoryService = createCrudService<CategoryEntry>(
  "/api/food/categories",
  {
    tag: "categories",
  },
);
