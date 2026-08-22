import { BaseItem } from "@/shared/types/base.types";

export interface UnitFormData {
  householdId: string;
  status: "active" | "backup" | "finished" | "discarded" | "expired";
  price: string | number;
  purchaseDate: string;
  expiryDate: string;
  dateOpened: string;
  paoMonths: number | null;
}

// Mengikuti pola entry yang mewarisi BaseItem dan FormData-nya
export interface UnitEntry extends BaseItem, UnitFormData {
  itemId: string;
  productName: string;
  paoProgress: number;
}

export const defaultUnit: UnitFormData = {
  status: "active",
  price: 0,
  purchaseDate: "",
  expiryDate: "",
  dateOpened: "",
  paoMonths: null,
  householdId: "",
};

export const validateUnit = (payload: UnitFormData): string[] => {
  const errors: string[] = [];
  if (!payload.status) {
    errors.push("Status is required.");
  }
  if (!payload.purchaseDate || payload.purchaseDate.trim() === "") {
    errors.push("Purchase date is required.");
  }
  if (!payload.expiryDate || payload.expiryDate.trim() === "") {
    errors.push("Expiry date is required.");
  }
  return errors;
};
