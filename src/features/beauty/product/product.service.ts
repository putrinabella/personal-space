import { createCrudService } from "@/shared/service/createCrudService";
import { ProductEntry } from "./product.types";

export const itemsService = createCrudService<ProductEntry>(
  "/api/beauty/items",
  {
    tag: "items",
  },
);
