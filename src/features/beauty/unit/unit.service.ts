import { createCrudService } from "@/shared/service/createCrudService";
import { UnitEntry } from "./unit.types";

export const unitService = createCrudService<UnitEntry>("/api/beauty/unit", {
  tag: "unit",
});
