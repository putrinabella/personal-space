import { BaseItem } from "@/shared/types/base.types";

export interface AccountsFormData {
  householdId: string;
  name: string;
  type: string;
  // currentBalance: string;
  currency: string;
  iconSlug: string;
  isArchived: boolean;
  color: string;
}

export interface AccountsEntry extends BaseItem, AccountsFormData {
  householdId: string;
  type: string;
  currentBalance: string;
  currency: string;
  iconSlug: string;
  isArchived: boolean;
  color: string;
}

export const defaultAccounts: AccountsFormData = {
  householdId: "",
  name: "",
  type: "",
  iconSlug: "",
  color: "",
  // currentBalance: "",
  currency: "",
  isArchived: false,
};

export const validateAccounts = (payload: AccountsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama wajib diisi.");
  if (!payload.iconSlug) errors.push("Icon wajib diisi.");
  return errors;
};
