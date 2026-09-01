// import { createCrudService } from "@/shared/service/createCrudService";
// import { WishlistEntry } from "./wishlist.types";

// export const wishlistService = createCrudService<WishlistEntry>(
//   "/api/beauty/wishlist",
//   {
//     tag: "wishlist",
//   },
// );

import { createCrudService } from "@/shared/service/createCrudService";
import { WishlistEntry } from "./wishlist.types";
import { apiFetch } from "@/shared/service/apiFetch";
import { ApiResponse } from "@/shared/types/common";

const basePath = "/api/beauty/wishlist";

const baseCrud = createCrudService<WishlistEntry>(basePath, {
  tag: "wishlist",
});

export const wishlistService = {
  ...baseCrud,

  async purchase(
    wishlistId: string,
    payload: Record<string, any>,
  ): Promise<any> {
    const json = await apiFetch<ApiResponse<any>>(basePath, {
      method: "POST",
      body: JSON.stringify({
        isPurchased: true,
        wishlistId,
        ...payload,
      }),
    });

    return json.data;
  },
};
