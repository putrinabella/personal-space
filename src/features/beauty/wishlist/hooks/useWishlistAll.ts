import { queryKeys } from "@/lib/queryKeys";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { wishlistService } from "../wishlist.service";
import { WishlistEntry } from "../wishlist.types";

export function useWishlistAll() {
  return useBaseAll<WishlistEntry>({
    queryKey: queryKeys.wishlist.all(),
    fetcher: wishlistService.getAll,
  });
}
