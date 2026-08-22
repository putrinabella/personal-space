import { createCrudService } from "@/shared/service/createCrudService";
import { ProductEntry } from "./product.types";

export const productService = createCrudService<ProductEntry>(
  "/api/beauty/items",
  {
    tag: "items",
  },
);
