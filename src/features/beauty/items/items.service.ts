import { createCrudService } from "@/shared/service/createCrudService";
import { ItemsEntry } from "./items.types";

export const itemsService = createCrudService<ItemsEntry>("/api/beauty/items", {
  tag: "items",
});
