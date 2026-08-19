// import { BaseItem } from "@/shared/types/base.types";
// import { CategoriesEntry } from "../categories/categories.types";
// import { BrandsEntry } from "../brands/brands.types";
// import { StoresEntry } from "../stores/stores.types";
// import { ConcernsEntry } from "../concerns/concerns.types";

// export interface ItemsFormData {
//   householdId: string;
//   categoryId: string;
//   createdById: string;
//   brandId: string;
//   storeId: string;
//   name: string;
//   status: string;
//   quantity: number;
//   minStock: number;
//   price: number;
//   purchaseDate: string;
//   expiryDate: string;
//   dateOpened: string;
//   paoMonths: string;
//   rating: string;
//   notes: string;
//   concernIds: string[];
// }

// export interface ItemsEntry extends BaseItem, ItemsFormData {
//   category: CategoriesEntry;
//   brand: BrandsEntry;
//   store: StoresEntry;
//   concerns: ConcernsEntry[];
// }

// export const defaultItems: ItemsFormData = {
//   householdId: "",
//   name: "",
//   categoryId: "",
//   createdById: "",
//   brandId: "",
//   storeId: "",
//   status: "active",
//   quantity: 0,
//   minStock: 0,
//   price: 0,
//   purchaseDate: "",
//   expiryDate: "",
//   dateOpened: "",
//   paoMonths: "",
//   rating: "",
//   notes: "",
//   concernIds: [],
// };

// export const validateItems = (payload: ItemsFormData): string[] => {
//   const errors: string[] = [];
//   if (!payload.name) errors.push("Name is required.");
//   return errors;
// };
import { BaseItem } from "@/shared/types/base.types";
import { CategoriesEntry } from "../categories/categories.types";
import { BrandsEntry } from "../brands/brands.types";
import { StoresEntry } from "../stores/stores.types";
import { ConcernsEntry } from "../concerns/concerns.types";

// Tipe data untuk setiap unit fisik / batch produk
export interface BeautyItemUnitEntry {
  id: string;
  itemId: string;
  status: "active" | "backup" | "finished" | "discarded";
  price: string | number;
  purchaseDate: string | null;
  expiryDate: string | null;
  dateOpened: string | null;
  paoMonths: number | null;
  createdAt: string;
  updatedAt: string;
}

// Data form saat membuat/mengedit master item beserta 1 unit fisik pertamanya
export interface ItemsFormData {
  householdId: string;
  name: string;
  categoryId: string;
  brandId: string;
  storeId?: string;
  minStock?: number;
  rating?: number;
  notes?: string;
  concernIds?: string[];

  // Properti baru untuk mode unit/batch
  beautyItemId?: string;
  isNewProduct?: boolean;

  // Data unit fisik
  status?: string;
  price?: string | number;
  purchaseDate?: string;
  expiryDate?: string;
  dateOpened?: string;
  paoMonths?: number;
}

// Tipe data yang diterima dari API saat melakukan GET item
export interface ItemsEntry
  extends BaseItem, Omit<ItemsFormData, keyof BeautyItemUnitEntry> {
  category: CategoriesEntry;
  brand: BrandsEntry;
  store: StoresEntry;
  units: BeautyItemUnitEntry[]; // Menampung daftar unit fisik / batch
  concerns: ConcernsEntry[];
  quantity: number; // <-- Tambahkan baris ini agar error hilang
}

export const defaultItems: ItemsFormData = {
  householdId: "",
  name: "",
  categoryId: "",
  brandId: "",
  storeId: "",
  minStock: 1,

  notes: "",
  concernIds: [],
  // Default values untuk unit fisik pertama
  status: "active",
  price: 0,
  purchaseDate: "",
  expiryDate: "",
  dateOpened: "",
};

export const validateItems = (): string[] => {
  const errors: string[] = [];
  // if (!payload.name) errors.push("Name is required.");
  // if (!payload.categoryId) errors.push("Category is required.");
  // if (!payload.brandId) errors.push("Brand is required.");
  return errors;
};
