import { createCrudService } from "@/shared/service/createCrudService";
import { WishlistEntry } from "./wishlist.types";

export const wishlistService = createCrudService<WishlistEntry>(
  "/api/beauty/wishlist",
  {
    tag: "wishlist",
  },
);
