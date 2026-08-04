import { BaseItem } from "@/shared/types/base.types";
import { PocketsEntry } from "../pockets/pockets.types";

export interface SavingFormData {
  householdId: string;
  name: string;
  description?: string;
  targetAmount: string;
  targetDate?: string;
  isCompleted?: boolean;
  pocketId: string;
}

export interface SavingEntry extends BaseItem, SavingFormData {
  pocket: PocketsEntry;
}

export const defaultSaving: SavingFormData = {
  name: "",
  description: "",
  targetAmount: "",
  targetDate: "",
  isCompleted: false,
  pocketId: "",
  householdId: "",
};

export const validateSaving = (payload: SavingFormData): string[] => {
  const errors: string[] = [];

  if (!payload.name || payload.name.trim() === "") {
    errors.push("Nama target menabung wajib diisi.");
  }

  if (!payload.targetAmount || Number(payload.targetAmount) <= 0) {
    errors.push("Target jumlah tabungan wajib diisi dan harus lebih dari 0.");
  }

  if (!payload.pocketId) {
    errors.push("Pocket (Kantong Tabungan) wajib dipilih.");
  }

  return errors;
};
