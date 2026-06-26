export interface BaseItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// // Tambahkan properti opsional untuk menampung field tambahan
// export interface Category extends BaseItem {
//   iconSlug: string;
// }
// export interface Cuisine extends BaseItem {}
// export interface DiningType extends BaseItem {}
// export interface Tag extends BaseItem {
//   bgColor: string;
// }
// export interface Restaurant extends BaseItem {
//   address: string;
//   googleMapsUrl: string;
//   isFavoriteRestaurant: boolean;
//   isFavoriteCafe: boolean;
// }
