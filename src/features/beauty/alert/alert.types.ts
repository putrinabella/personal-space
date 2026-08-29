// features/beauty/product/types/product-alert.types.ts
import { BaseItem } from "@/shared/types/base.types";
import { BrandsEntry } from "../brands/brands.types";

// 1. Tipe data untuk objek Unit
export interface UnitEntry {
  id: string;
  itemId: string;
  status: "active" | "backup" | "finished" | "discarded" | "expired";
  price: string;
  purchaseDate: string | null;
  expiryDate: string | null;
  dateOpened: string | null;
  paoMonths: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  paoProgress: number | null;
  isExpired: boolean;
  isExpiringSoon: boolean;
  daysLeft: number;
}

// 2. Tipe data untuk item produk lengkap beserta unitnya (Perbaikan nama/struktur)
export interface AlertUnitEntry extends BaseItem {
  householdId: string;
  categoryId: string;
  createdById: string;
  brandId: string;
  storeId: string | null;
  name: string;
  minStock: number;
  rating: number | null;
  notes: string | null;

  // Relasi dan data unit yang diratakan langsung pada level item
  brand: BrandsEntry | null;
  unit: UnitEntry;
}

// 3. Struktur respons keseluruhan dari API Alert (Gunakan AlertUnitEntry[])
export interface AlertEntry {
  expiredUnits: AlertUnitEntry[];
  expiringSoon: AlertUnitEntry[];
  paoWarning: AlertUnitEntry[];
  calendarEvents: {
    id: string;
    title: string;
    date: string;
    type: "expiry" | "pao";
    daysLeft: number;
  }[];
}
