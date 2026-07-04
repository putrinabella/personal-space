import { BaseItem } from "@/shared/types/base.types";

export interface CuisinesFormData {
  name: string;
}

export interface CuisinesEntry extends BaseItem, CuisinesFormData {}

export const defaultCuisines: CuisinesFormData = {
  name: "",
};

export const validateCuisines = (payload: CuisinesFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  return errors;
};
