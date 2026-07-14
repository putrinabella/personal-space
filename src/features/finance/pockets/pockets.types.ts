import { BaseItem } from "@/shared/types/base.types";

export interface TypeFormData {
  householdId: string;
  name: string;
  type: string;
  iconSlug: string;
  monthlyAllocationAmount: string;
  isAutoAllocationActive: boolean;
  allocationDay: string;
  color: string;
}

export interface TypeEntry extends BaseItem, TypeFormData {
  householdId: string;
  type: string;
  iconSlug: string;
  monthlyAllocationAmount: string;
  isAutoAllocationActive: boolean;
  allocationDay: string;
  color: string;
}

export const defaultType: TypeFormData = {
  householdId: "",
  name: "",
  type: "",
  iconSlug: "",
  monthlyAllocationAmount: "",
  isAutoAllocationActive: false,
  allocationDay: "",
  color: "",
};

export const validateType = (payload: TypeFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama kategori wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
