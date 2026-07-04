import { BaseItem } from "@/shared/types/base.types";

export interface TagFormData {
  name: string;
  bgColor: string;
}

export interface TagEntry extends BaseItem, TagFormData {
  bgColor: string;
}

export const defaultTag: TagFormData = {
  name: "",
  bgColor: "",
};

export const validateTag = (payload: TagFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama tag wajib diisi.");
  if (!payload.bgColor) errors.push("Warna latar belakang wajib diisi.");
  return errors;
};
