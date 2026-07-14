import { createCrudService } from "@/shared/service/createCrudService";
import { PocketsEntry } from "./pockets.types";

export const pocketsService = createCrudService<PocketsEntry>(
  "/api/finance/pockets",
  {
    tag: "pockets",
  },
);
