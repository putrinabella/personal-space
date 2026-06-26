import { createCrudService } from "@/shared/service/createCrudService";
import { tagsTypes } from "./tags.types";

export const tagsService = createCrudService<tagsTypes>("/api/food/tags", {
  tag: "tags",
});
