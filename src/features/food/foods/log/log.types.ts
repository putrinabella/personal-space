import { BaseItem } from "@/shared/types/base.types";

// Tipe data yang dikirim ke form/API (Tanpa field otomatis DB)
export interface LogFormData {
  price: number;
  dateVisited: string;
  reviewText: string;
  ratingHis: number;
  ratingHer: number;
}

// Tipe data lengkap (untuk list/tampilan)
export interface LogEntry extends BaseItem, LogFormData {}

export const defaultLogs: LogFormData = {
  price: 0,
  dateVisited: "",
  reviewText: "",
  ratingHis: 0,
  ratingHer: 0,
};

export const validateLogs = (payload: LogFormData): string[] => {
  const errors: string[] = [];
  if (!payload.price) errors.push("Harga wajib diisi.");
  if (!payload.dateVisited) errors.push("Tanggal kunjungan wajib diisi.");
  return errors;
};
