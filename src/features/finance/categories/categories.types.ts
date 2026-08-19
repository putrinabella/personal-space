import { BaseItem } from "@/shared/types/base.types";

export interface CategoriesFormData {
  householdId: string;
  parentId: string;
  name: string;
  type: string;
  iconSlug: string;
  color: string;
}

export interface CategoriesEntry extends BaseItem, CategoriesFormData {
  householdId: string;
  parentId: string;
  type: string;
  iconSlug: string;
  color: string;
}

export const defaultCategories: CategoriesFormData = {
  householdId: "",
  name: "",
  type: "",
  iconSlug: "",
  color: "",
  parentId: "",
};

export const validateCategories = (payload: CategoriesFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
