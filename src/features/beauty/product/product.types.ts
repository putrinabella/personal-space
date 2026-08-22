import { BaseItem } from "@/shared/types/base.types";
import { CategoriesEntry } from "../categories/categories.types";
import { BrandsEntry } from "../brands/brands.types";
import { StoresEntry } from "../stores/stores.types";
import { ConcernsEntry } from "../concerns/concerns.types";
import { UnitEntry } from "../unit/unit.types";

// Tipe data untuk Form Master Product
export interface ProductFormData {
  beautyItemId: string;
  householdId: string;
  name: string;
  categoryId: string;
  brandId: string;
  storeId?: string;
  minStock?: number;
  rating?: number;
  notes?: string;
  concernIds?: string[];

  // Properti opsional untuk skenario pembuatan Product + Unit sekaligus
  isNewProduct?: boolean;
  status?: string;
  price?: string | number;
  purchaseDate?: string;
  expiryDate?: string;
  dateOpened?: string;
  paoMonths?: number | null;
}

// Tipe data untuk Product Entry (menggunakan BaseItem)
export interface ProductEntry extends BaseItem {
  householdId: string;
  name: string;
  categoryId: string;
  brandId: string;
  storeId?: string | null;
  minStock: number;
  rating?: number | null;
  notes?: string | null;

  // Relasi
  category: CategoriesEntry;
  brand: BrandsEntry;
  store: StoresEntry;
  units: UnitEntry[]; // Menggunakan interface dari units.types
  concerns: ConcernsEntry[];
  concernIds: string[];
  quantity: number;
}

export const defaultProduct: ProductFormData = {
  householdId: "",
  name: "",
  categoryId: "",
  brandId: "",
  storeId: "",
  minStock: 1,
  notes: "",
  concernIds: [],
  status: "active",
  price: 0,
  purchaseDate: "",
  expiryDate: "",
  dateOpened: "",
  paoMonths: null,
  beautyItemId: "",
};

export const validateProduct = (_payload: ProductFormData): string[] => {
  const errors: string[] = [];

  // if (!payload.name) errors.push("Product name is required.");
  // if (!payload.categoryId) errors.push("Category is required.");
  // if (!payload.brandId) errors.push("Brand is required.");

  return errors;
};
