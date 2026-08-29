import { createCrudService } from "@/shared/service/createCrudService";
import { AlertEntry } from "./alert.types";

export const alertService = createCrudService<AlertEntry>(
  "/api/beauty/alerts",
  {
    tag: "alert",
  },
);
