import { BaseItem } from "@/shared/types/base.types";

export interface PocketsFormData {
  householdId: string;
  name: string;
  type: string;
  iconSlug: string;
  monthlyAllocationAmount: string;
  isAutoAllocationActive: boolean;
  allocationDay: string;
  color: string;
}

export interface PocketsEntry extends BaseItem, PocketsFormData {
  householdId: string;
  type: string;
  iconSlug: string;
  monthlyAllocationAmount: string;
  isAutoAllocationActive: boolean;
  allocationDay: string;
  color: string;
  currentBalance: string;
}

export const defaultPockets: PocketsFormData = {
  householdId: "",
  name: "",
  type: "",
  iconSlug: "",
  monthlyAllocationAmount: "",
  isAutoAllocationActive: false,
  allocationDay: "",
  color: "",
};

export const validatePockets = (payload: PocketsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
