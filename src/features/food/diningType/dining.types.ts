import { BaseItem } from "@/shared/types/base.types";

export interface DiningTypeFormData {
  name: string;
  iconSlug: string;
}

export interface DiningTypeEntry extends BaseItem, DiningTypeFormData {
  iconSlug: string;
}

export const defaultDiningType: DiningTypeFormData = {
  name: "",
  iconSlug: "",
};

export const validateDiningType = (payload: DiningTypeFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
