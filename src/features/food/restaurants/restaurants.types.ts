import { BaseItem } from "@/shared/types/base.types";
export interface RestaurantFormData {
  name: string;
  address: string;
  googleMapsUrl: string;
  isFavoriteRestaurant: boolean;
  isFavoriteCafe: boolean;
}
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
