import { BaseItem } from "@/shared/types/base.types";

export interface CategoryFormData {
  name: string;
  iconSlug: string;
}

export interface CategoryEntry extends BaseItem, CategoryFormData {
  iconSlug: string;
}

export const defaultCategory: CategoryFormData = {
  name: "",
  iconSlug: "",
};

export const validateCategory = (payload: CategoryFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
