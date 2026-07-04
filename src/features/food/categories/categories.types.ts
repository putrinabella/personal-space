import { BaseItem } from "@/shared/types/base.types";

export interface CategoriesFormData {
  name: string;
  iconSlug: string;
}

export interface CategoriesEntry extends BaseItem, CategoriesFormData {
  iconSlug: string;
}

export const defaultCategories: CategoriesFormData = {
  name: "",
  iconSlug: "",
};

export const validateCategories = (payload: CategoriesFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
