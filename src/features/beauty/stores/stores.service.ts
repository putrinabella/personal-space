import { createCrudService } from "@/shared/service/createCrudService";
import { StoresEntry } from "./stores.types";

export const storesService = createCrudService<StoresEntry>(
  "/api/beauty/stores",
  {
    tag: "stores",
  },
);
