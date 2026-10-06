import { BaseItem } from "@/shared/types/base.types";
import { BrandsEntry } from "../brands/brands.types";
import { CategoriesEntry } from "../categories/categories.types";
import { UnitEntry } from "../unit/unit.types";

export interface WasteFormData {
  householdId: string;
  itemId?: string | null;
  brandId?: string | null;
  categoryId: string;
  brandNameSnapshot: string;
  name: string;
  price: string;
  expiredDate: string;
}

export interface WasteEntry extends BaseItem, WasteFormData {
  item?: UnitEntry | null;
  brand?: BrandsEntry | null;
  category: CategoriesEntry;
}

export const defaultWaste: WasteFormData = {
  householdId: "",
  itemId: null,
  brandId: null,
  categoryId: "",
  brandNameSnapshot: "",
  name: "",
  price: "0",
  expiredDate: new Date().toISOString().split("T")[0],
};

export const validateWaste = (payload: WasteFormData): string[] => {
  const errors: string[] = [];

  if (!payload.name) errors.push("Name is required.");
  if (!payload.categoryId) errors.push("Category is required.");
  if (!payload.brandNameSnapshot)
    errors.push("Brand name snapshot is required.");
  if (!payload.expiredDate) errors.push("Expired date is required.");

  return errors;
};

export interface MoveToWasteFormData {
  unitId: string;
}

export const defaultMoveToWaste: MoveToWasteFormData = {
  unitId: "",
};

export const validateMoveToWaste = (payload: MoveToWasteFormData): string[] => {
  const errors: string[] = [];

  if (!payload.unitId) errors.push("Unit ID is required.");

  return errors;
};
