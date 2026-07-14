import { createCrudService } from "@/shared/service/createCrudService";
import { TypeEntry } from "./type.types";

export const typeService = createCrudService<TypeEntry>("/api/food/Type", {
  tag: "finance-type",
});
