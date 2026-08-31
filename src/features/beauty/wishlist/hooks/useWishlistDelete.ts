import { queryKeys } from "@/lib/queryKeys";
import { wishlistService } from "../wishlist.service";
import { useBaseDelete } from "@/shared/hooks/core/use-base-delete";

export function useWishlistDelete() {
  return useBaseDelete({
    entityName: "Wishlist",

    mutationFn: wishlistService.delete,

    invalidateQueryKey: queryKeys.wishlist.lists(),

    messages: {
      deleteSuccess: "Wishlist deleted successfully",
    },
  });
}
