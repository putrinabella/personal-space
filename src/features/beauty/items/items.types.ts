import { BaseItem } from "@/shared/types/base.types";

export interface ItemsFormData {
  householdId: string;
  categoryId: string;
  createdById: string;
  brandId: string;
  storeId: string;
  name: string;
  status: string;
  quantity: number;
  minStock: number;
  price: number;
  purchaseDate: string;
  expiryDate: string;
  dateOpened: string;
  paoMonths: string;
  rating: string;
  notes: string;
  color: string;
}

export interface ItemsEntry extends BaseItem, ItemsFormData {}

export const defaultItems: ItemsFormData = {
  householdId: "",
  name: "",
  color: "",
  categoryId: "",
  createdById: "",
  brandId: "",
  storeId: "",
  status: "active",
  quantity: 0,
  minStock: 0,
  price: 0,
  purchaseDate: "",
  expiryDate: "",
  dateOpened: "",
  paoMonths: "",
  rating: "",
  notes: "",
};

export const validateItems = (payload: ItemsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  return errors;
};
