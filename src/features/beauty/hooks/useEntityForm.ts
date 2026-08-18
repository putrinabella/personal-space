import { useCategoriesForm } from "@/features/beauty/categories/hooks/useCategoriesForm";
import { useConcernsForm } from "@/features/beauty/concerns/hooks/useConcernsForm";
import { useBrandsForm } from "../brands/hooks/useBrandsForm";
import { useStoresForm } from "../stores/hooks/useStoresForm";

export const useEntityForm = (entity: string, id?: string) => {
  const isCreating = id === "create" || !id;
  const safeId = isCreating ? undefined : id;
  const categories = useCategoriesForm(safeId, entity === "categories");
  const brands = useBrandsForm(safeId, entity === "brands");
  const stores = useStoresForm(safeId, entity === "stores");
  const concerns = useConcernsForm(safeId, entity === "concerns");

  switch (entity) {
    case "categories":
      return categories;
    case "brands":
      return brands;
    case "stores":
      return stores;
    case "concerns":
      return concerns;
    default:
      throw new Error("Entity tidak ditemukan");
  }
};
