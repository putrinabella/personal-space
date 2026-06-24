import {} from "@/shared/service/createCrudService";
import { PolyclinicItem } from "./types/polyclinic.types";

export const polyclinicService = createCrudService<PolyclinicItem>(
  "/client/polyclinic",
  {
    tag: "polyclinic",
  },
);
export const polyclinicDetailService = createCrudService<PolyclinicItem>(
  "/client/all/polyclinic",
  {
    tag: "polyclinic/all",
  },
);
