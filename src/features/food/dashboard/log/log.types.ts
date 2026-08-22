import { BaseItem } from "@/shared/types/base.types";
export interface LogFormData {
  price: number;
  ratingHis: number;
  ratingHer: number;
  reviewText: string;
  dateVisited: string;
  foodName?: string;
  restaurantId: string;
  categoryId: string;
  cuisineId: string;
  diningTypeId: string;
  isFavoriteFood?: boolean;
  isFavoriteDrink?: boolean;
  foodId?: string;

  isNewFood?: boolean;
}
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

export const validateLogs = (): string[] => {
  const errors: string[] = [];
  return errors;
};
