import { BaseItem } from "@/shared/types/base.types";
import { CategoriesEntry } from "../categories/categories.types";
import { RestaurantEntry } from "../restaurants/restaurants.types";
import { TagEntry } from "../tags/tags.types";
import { CuisinesEntry } from "../cuisines/cuisines.types";

export interface FoodTag {
  foodEntryId: string;
  tagId: string;
  tag: TagEntry;
}

export interface FoodFormData {
  restaurantId: string;
  categoryId: string;
  cuisineId: string;
  diningTypeId: string;
  foodName: string;
  isFavoriteFood: boolean;
  isFavoriteDrink: boolean;
}

export const defaultFood: FoodFormData = {
  restaurantId: "",
  categoryId: "",
  cuisineId: "",
  diningTypeId: "",
  foodName: "",
  isFavoriteFood: false,
  isFavoriteDrink: false,
};

export const validateFood = (payload: FoodFormData): string[] => {
  const errors: string[] = [];
  if (!payload.foodName) errors.push("Nama makanan wajib diisi.");
  return errors;
};

export interface FoodEntry extends BaseItem, FoodFormData {
  restaurantId: string;
  categoryId: string;
  cuisineId: string;
  diningTypeId: string;
  foodName: string;
  isFavoriteFood: boolean;
  isFavoriteDrink: boolean;
  restaurant: RestaurantEntry;
  category: CategoriesEntry;
  cuisine: CuisinesEntry;
  // tags: FoodTag[];
}
