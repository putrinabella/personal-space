import { BaseItem } from "@/features/food/foods/food.types";

// Tipe data yang dikirim ke form/API (Tanpa field otomatis DB)
export interface RestaurantFormData {
  name: string;
  address: string;
  googleMapsUrl: string;
  isFavoriteRestaurant: boolean;
  isFavoriteCafe: boolean;
}

// Tipe data lengkap (untuk list/tampilan)
export interface RestaurantEntry extends BaseItem, RestaurantFormData {}

export const defaultRestaurants: RestaurantFormData = {
  name: "",
  address: "",
  googleMapsUrl: "",
  isFavoriteRestaurant: false,
  isFavoriteCafe: false,
};

export const validateRestaurants = (payload: RestaurantFormData): string[] => {
  const errors: string[] = [];
  if (!payload.name) errors.push("Nama wajib diisi.");
  if (!payload.address) errors.push("Alamat wajib diisi.");
  return errors;
};
