import { useCategoryForm } from "@/features/food/category/hooks/useCategoryForm";
import { useCuisinesForm } from "@/features/food/cuisines/hooks/useCuisinesForm";
import { useDiningTypeForm } from "@/features/food/diningType/hooks/useDiningTypeForm";
import { useTagForm } from "@/features/food/tags/hooks/useTagForm";

export const useEntityForm = (entity: string, id?: string) => {
  const isCreating = id === "create" || !id;
  const safeId = isCreating ? undefined : id;
  const category = useCategoryForm(safeId, entity === "category");
  const cuisines = useCuisinesForm(safeId, entity === "cuisines");
  const diningType = useDiningTypeForm(safeId, entity === "diningType");
  const tags = useTagForm(safeId, entity === "tags");

  switch (entity) {
    case "category":
      return category;
    case "cuisines":
      return cuisines;
    case "diningType":
      return diningType;
    case "tags":
      return tags;
    default:
      throw new Error("Entity tidak ditemukan");
  }
};
