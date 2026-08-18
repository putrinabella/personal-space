import { createCrudService } from "@/shared/service/createCrudService";
import { BrandsEntry } from "./brands.types";

export const brandsService = createCrudService<BrandsEntry>(
  "/api/beauty/brands",
  {
    tag: "brands",
  },
);
