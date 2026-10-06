// import { createCrudService } from "@/shared/service/createCrudService";
// import { ProductEntry } from "./product.types";

// export const productService = createCrudService<ProductEntry>(
//   "/api/beauty/items",
//   {
//     tag: "items",
//   },
// );
import { createCrudService } from "@/shared/service/createCrudService";
import { ProductEntry } from "./product.types";
import { apiFetch } from "@/shared/service/apiFetch";
import { ApiResponse } from "@/shared/types/common";

const basePath = "/api/beauty/items"; // Sesuaikan dengan base path API produk Kakak

const baseCrud = createCrudService<ProductEntry>(basePath, {
  tag: "items",
});

export const productService = {
  ...baseCrud,

  // Method khusus untuk lookup barcode
  async lookupBarcode(barcode: string): Promise<any> {
    const json = await apiFetch<ApiResponse<any>>(
      `/api/beauty/barcode?barcode=${barcode}`,
      {
        method: "GET",
      },
    );
    return json.data;
  },
};
