import { BaseItem } from "@/shared/types/base.types";

export interface CategoriesFormData {
  householdId: string;
  parentId: string;
  name: string;
  iconSlug: string;
  color: string;
}

export interface CategoriesEntry extends BaseItem, CategoriesFormData {}

export const defaultCategories: CategoriesFormData = {
  householdId: "",
  name: "",
  iconSlug: "",
  color: "",
  parentId: "",
};

export const validateCategories = (payload: CategoriesFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama wajib diisi.");
  return errors;
};
