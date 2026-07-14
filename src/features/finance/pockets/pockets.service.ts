import { createCrudService } from "@/shared/service/createCrudService";
import { TypeEntry } from "./pockets.types";

export const typeService = createCrudService<TypeEntry>("/api/food/Type", {
  tag: "finance-type",
});
