import { BaseItem } from "@/shared/types/base.types";

export interface ConcernsFormData {
  householdId: string;
  name: string;
  color: string;
}

export interface ConcernsEntry extends BaseItem, ConcernsFormData {}

export const defaultConcerns: ConcernsFormData = {
  householdId: "",
  name: "",
  color: "",
};

export const validateConcerns = (payload: ConcernsFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Name is required.");
  return errors;
};
