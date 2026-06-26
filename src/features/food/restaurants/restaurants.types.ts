import { BaseItem } from "@/features/food/foods/food.types";

export interface restaurantsTypes extends BaseItem {
  address: string;
  googleMapsUrl: string;
  isFavoriteRestaurant: boolean;
  isFavoriteCafe: boolean;
}
