import { queryKeys } from "@/lib/queryKeys";
import {
  defaultWishlist,
  WishlistFormData,
  validateWishlist,
} from "../wishlist.types";
import { wishlistService } from "../wishlist.service";
import { useHouseholdForm } from "@/shared/hooks/use-household-form";

export function useWishlistForm(wishlistId?: string, enabled: boolean = true) {
  return useHouseholdForm<WishlistFormData>({
    id: wishlistId,
    enabled,
    entityName: "wishlist",
    defaultValues: defaultWishlist,
    queryKey: queryKeys.wishlist.detail(wishlistId || ""),
    invalidateQueryKey: queryKeys.wishlist.lists(),

    getDetail: async (id: string) => await wishlistService.getDetail(id),
    createFn: wishlistService.create,
    updateFn: wishlistService.update,
    validate: validateWishlist,
    redirectTo: "/beauty/wishlist",
    messages: {
      createSuccess: "Wishlist created successfully",
      updateSuccess: "Wishlist updated successfully",
      fetchError: "Failed to load wishlist data",
    },
  });
}
