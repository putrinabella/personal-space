import { queryKeys } from "@/lib/queryKeys";
import {
  defaultProduct,
  ProductFormData,
  validateProduct,
} from "../product.types";
import { productService } from "../product.service";
import { useHouseholdWithAuthForm } from "@/shared/hooks/use-household-form";

export function useProductForm(itemsId?: string, enabled: boolean = true) {
  return useHouseholdWithAuthForm<ProductFormData>({
    id: itemsId,
    enabled,
    entityName: "items",
    defaultValues: defaultProduct,
    queryKey: queryKeys.items.detail(itemsId || ""),
    invalidateQueryKey: queryKeys.items.all(),

    getDetail: async (id: string) => await productService.getDetail(id),
    createFn: productService.create,
    updateFn: productService.update,
    validate: validateProduct,
    redirectTo: "/beauty/dashboard",
    messages: {
      createSuccess: "Product created successfully",
      updateSuccess: "Product updated successfully",
      fetchError: "Failed to load product data",
    },
  });
}
