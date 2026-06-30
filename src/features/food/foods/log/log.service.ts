import { createCrudService } from "@/shared/service/createCrudService";
import { LogEntry } from "./log.types";

export const logService = createCrudService<LogEntry>("/api/food-logs", {
  tag: "food-logs",
});
