import { createCrudService } from "@/shared/service/createCrudService";
import { CategoriesEntry } from "./categories.types";

export const categoriesService = createCrudService<CategoriesEntry>(
  "/api/beauty/categories",
  {
    tag: "categories",
  },
);
