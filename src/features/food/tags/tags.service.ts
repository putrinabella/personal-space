import { createCrudService } from "@/shared/service/createCrudService";
import { TagEntry } from "./tags.types";

export const tagsService = createCrudService<TagEntry>("/api/food/tags", {
  tag: "tags",
});
