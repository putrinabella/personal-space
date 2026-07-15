import { useCategoriesForm } from "@/features/finance/categories/hooks/useCategoriesForm";
import { useAccountsForm } from "@/features/finance/accounts/hooks/useAccountsForm";
import { usePocketsForm } from "@/features/finance/pockets/hooks/usePocketsForm";

export const useEntityForm = (entity: string, id?: string) => {
  const isCreating = id === "create" || !id;
  const safeId = isCreating ? undefined : id;

  // HANYA aktifkan hook yang sesuai dengan entity saat ini
  const categories = useCategoriesForm(safeId, entity === "categories");
  const accounts = useAccountsForm(safeId, entity === "accounts");
  const pockets = usePocketsForm(safeId, entity === "pockets");
  // const tags = useTagForm(safeId, entity === "tags");

  switch (entity) {
    case "categories":
      return categories;
    case "accounts":
      return accounts;
    case "pockets":
      return pockets;
    // case "tags":
    //   return tags;
    default:
      throw new Error("Entity tidak ditemukan");
  }
};
