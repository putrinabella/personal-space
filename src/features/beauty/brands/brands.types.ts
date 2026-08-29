import { BaseItem } from "@/shared/types/base.types";

export interface BrandsFormData {
  householdId: string;
  name: string;
  logoUrl: string;
  storeLink: string;
}

export interface BrandsEntry extends BaseItem, BrandsFormData {}

export const defaultBrands: BrandsFormData = {
  householdId: "",
  name: "",
  logoUrl: "",
  storeLink: "",
};

export const validateBrands = (payload: BrandsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  return errors;
};
