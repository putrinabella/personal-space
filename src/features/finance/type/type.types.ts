import { BaseItem } from "@/shared/types/base.types";

export interface TypeFormData {
  householdId: string;
  name: string;
  type: string;
  iconSlug: string;
}

export interface TypeEntry extends BaseItem, TypeFormData {
  iconSlug: string;
}

export const defaultType: TypeFormData = {
  householdId: "",
  name: "",
  type: "",
  iconSlug: "",
};

export const validateType = (payload: TypeFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
