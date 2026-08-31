import { createCrudService } from "@/shared/service/createCrudService";
import { BrandsEntry } from "./waste.types";

export const brandsService = createCrudService<BrandsEntry>(
  "/api/beauty/brands",
  {
    tag: "brands",
  },
);
