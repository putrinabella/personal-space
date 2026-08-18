import { createCrudService } from "@/shared/service/createCrudService";
import { ConcernsEntry } from "./concerns.types";

export const concernsService = createCrudService<ConcernsEntry>(
  "/api/beauty/concerns",
  {
    tag: "concerns",
  },
);
