import { BaseItem } from "@/shared/types/base.types";

export interface DiningTypeFormData {
  name: string;
}

export interface DiningTypeEntry extends BaseItem, DiningTypeFormData {}

export const defaultDiningType: DiningTypeFormData = {
  name: "",
};

export const validateDiningType = (payload: DiningTypeFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  return errors;
};
