import { BaseItem } from "@/shared/types/base.types";
import { BrandsEntry } from "../brands/brands.types";
import { CategoriesEntry } from "../categories/categories.types";

export interface WishlistFormData {
  householdId: string;
  name: string;
  brandId: string;

  categoryId: string;
  estimatedPrice: string;
  storeLink: string;
  priority: string;
}

export interface WishlistEntry extends BaseItem, WishlistFormData {
  brand: BrandsEntry;
  category: CategoriesEntry;
}

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
export interface PurchaseWishlistFormData {
  householdId: string;
  price: string;
  brandId: string;

  categoryId: string;
  minStock: number;
  rating: number | null;
  notes: string;
  status: string;
  purchaseDate: string;
  expiryDate: string;
  dateOpened: string;
  paoMonths: number | null;
}

export const defaultPurchaseWishlist: PurchaseWishlistFormData = {
  householdId: "",
  price: "",
  brandId: "",
  categoryId: "",
  minStock: 1,
  rating: null,
  notes: "",
  status: "active",
  purchaseDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
  dateOpened: "",
  paoMonths: null,
};

export const validatePurchaseWishlist = (
  payload: PurchaseWishlistFormData,
): string[] => {
  const errors: string[] = [];
  if (!payload.status) errors.push("Status is required.");
  return errors;
};
