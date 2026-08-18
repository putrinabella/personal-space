import { BaseItem } from "@/shared/types/base.types";

export interface BrandsFormData {
  householdId: string;
  name: string;
  logo_url: string;
}

export interface BrandsEntry extends BaseItem, BrandsFormData {}

export const defaultBrands: BrandsFormData = {
  householdId: "",
  name: "",
  logo_url: "",
};

export const validateBrands = (payload: BrandsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama wajib diisi.");
  return errors;
};
