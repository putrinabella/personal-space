import { createCrudService } from "@/shared/service/createCrudService";
import { WasteEntry } from "./waste.types";

export const wasteService = createCrudService<WasteEntry>("/api/beauty/waste", {
  tag: "waste",
});
