import { BaseItem } from "@/shared/types/base.types";

export interface StoresFormData {
  householdId: string;
  name: string;
  store_link: string;
}

export interface StoresEntry extends BaseItem, StoresFormData {}

export const defaultStores: StoresFormData = {
  householdId: "",
  name: "",
  store_link: "",
};

export const validateStores = (payload: StoresFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama wajib diisi.");
  return errors;
};
