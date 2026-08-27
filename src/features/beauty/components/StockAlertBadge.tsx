"use client";

import { Warning, XCircle } from "@phosphor-icons/react";
interface StockAlertBadgeProps {
  quantity: number;
  minimumStock: number;
  className?: string;
}

export default function StockAlertBadge({
  quantity,
  minimumStock,
}: StockAlertBadgeProps) {
  // Logika kondisi stok
  const isOutOfStock = quantity <= 0;
  const isLowStock = quantity > 0 && quantity <= minimumStock;

  if (isOutOfStock) {
    return (
      <div className="relative flex flex-row gap-2 items-center justify-center align-middle py-1 bg-error/80 rounded-lg text-data">
        <XCircle size={14} weight="bold" />
        <span>Out of Stock</span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="relative flex flex-row gap-2 items-center justify-center align-middle py-1 bg-warning/80 rounded-lg text-data">
        <Warning size={14} weight="bold" />
        <span>Low Stock</span>
      </div>
    );
  }

  return null;
}
