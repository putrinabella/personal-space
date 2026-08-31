import { BaseItem } from "@/shared/types/base.types";

export interface WishlistFormData {
  householdId: string;
  name: string;
  brandId: string;

  categoryId: string;
  estimatedPrice: string;
  storeLink: string;
  priority: string;
}

export interface WishlistEntry extends BaseItem, WishlistFormData {}

export const defaultWishlist: WishlistFormData = {
  householdId: "",
  name: "",
  brandId: "",
  categoryId: "",
  estimatedPrice: "",
  storeLink: "",
  priority: "",
};

export const validateWishlist = (payload: WishlistFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  return errors;
};
