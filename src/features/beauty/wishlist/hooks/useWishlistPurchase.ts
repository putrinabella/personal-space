import { queryKeys } from "@/lib/queryKeys";
import { wishlistService } from "../wishlist.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";
import {
  defaultPurchaseWishlist,
  PurchaseWishlistFormData,
  validatePurchaseWishlist,
} from "../wishlist.types";

export function useWishlistPurchase(wishlistId: string) {
  return useHouseholdWithAuthForm<PurchaseWishlistFormData>({
    // JANGAN masukkan 'id: wishlistId' di sini agar tidak memicu mode update/PUT
    enabled: !!wishlistId,
    entityName: "Wishlist Purchase",
    defaultValues: defaultPurchaseWishlist,
    queryKey: queryKeys.wishlist.detail(wishlistId),
    invalidateQueryKey: [
      ...queryKeys.wishlist.lists(),
      ...queryKeys.unit.all(),
      ...queryKeys.alert.all(),
      ...queryKeys.items.lists(),
    ],

    getDetail: async () => {
      const detail = await wishlistService.getDetail(wishlistId);
      if (!detail) return defaultPurchaseWishlist;
      return {
        ...defaultPurchaseWishlist,
        price: detail.estimatedPrice || "",
        categoryId: detail.categoryId || "",
      };
    },

    createFn: async (payload: any) => {
      return await wishlistService.purchase(wishlistId, {
        ...payload,
        minStock: Number(payload.minStock),
        rating: payload.rating ? Number(payload.rating) : null,
        paoMonths: payload.paoMonths ? Number(payload.paoMonths) : null,
      });
    },

    // Tetap kosongkan updateFn karena tidak dipakai
    updateFn: async () => {
      return null as any;
    },

    validate: validatePurchaseWishlist,
    redirectTo: "/beauty/dashboard",

    messages: {
      createSuccess:
        "Wishlist item purchased and moved to inventory successfully",
      fetchError: "Failed to load wishlist data for purchase",
    },
  });
}
