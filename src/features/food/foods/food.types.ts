import { CategoriesEntry } from "../categories/categories.types";
import { RestaurantEntry } from "../restaurants/restaurants.types";
import { TagEntry } from "../tags/tags.types";

export interface BaseItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FoodTag {
  foodEntryId: string;
  tagId: string;
  tag: TagEntry;
}

export interface FoodEntry extends BaseItem {
  restaurantId: string;
  categoryId: string;
  cuisineId: string;
  diningTypeId: string;
  foodName: string;
  price: string;
  dateVisited: string;
  reviewText: string;
  ratingOverall: number | null;
  ratingTaste: number | null;
  ratingPortion: number | null;
  ratingValue: number | null;
  ratingAtmosphere: number | null;
  isFavoriteFood: boolean;
  isFavoriteDrink: boolean;
  restaurant: RestaurantEntry;
  category: CategoriesEntry;
  tags: FoodTag[];
}
