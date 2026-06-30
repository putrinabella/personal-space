import { BaseItem } from "@/shared/types/base.types";

// Tipe data yang dikirim ke form/API (Tanpa field otomatis DB)
export interface LogFormData {
  // Data Log (Tanpa id, karena id hanya ada saat data dari DB)
  price: number;
  ratingHis: number;
  ratingHer: number;
  reviewText: string;
  dateVisited: string; // Tambahkan ini karena ada di defaultLogs

  // Data Food
  foodName?: string;
  restaurantId: string;
  categoryId: string;
  cuisineId: string;
  diningTypeId: string;
  isFavoriteFood?: boolean;
  isFavoriteDrink?: boolean;
  foodId?: string;

  isNewFood?: boolean; // Tambahkan ini
}
// Tipe data lengkap (untuk list/tampilan)
export interface LogEntry extends BaseItem, LogFormData {}

export const defaultLogs: LogFormData = {
  foodId: "",
  dateVisited: "",
  price: 0,
  reviewText: "",
  ratingHis: 0,
  ratingHer: 0,
  restaurantId: "",
  categoryId: "",
  cuisineId: "",
  diningTypeId: "",
};

export const validateLogs = (payload: LogFormData): string[] => {
  const errors: string[] = [];
  // if (!payload.price) errors.push("Harga wajib diisi.");
  // if (!payload.dateVisited) errors.push("Tanggal kunjungan wajib diisi.");
  // if (!payload.foodId) errors.push("Makanan wajib dipilih.");
  return errors;
};
