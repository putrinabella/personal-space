"use client";

import CardBox from "@/shared/components/CardBox";
import MetricStats from "@/shared/components/MetricStats";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  Storefront,
  ArrowSquareOut,
  ShoppingCartSimple,
} from "@phosphor-icons/react";

interface WishlistCardProps {
  item: {
    id: string;
    name: string;
    estimatedPrice: string | number;
    priority: "High" | "Medium" | "Low";
    storeLink?: string | null;
    reason?: string | null;
    brand: {
      id: string;
      name: string;
      storeLink?: string | null;
    };
    category: {
      id: string;
      name: string;
    };
  };
  onPurchaseClick?: (item: any) => void;
  onEditClick?: (item: any) => void;
}

export default function WishlistCard({
  item,
  onPurchaseClick,
  onEditClick,
}: WishlistCardProps) {
  const activeStoreLink = item.storeLink || item.brand.storeLink;
  const formatedPrice = formatRupiah(item.estimatedPrice);
  return (
    <CardBox
      onClick={() => onEditClick && onEditClick(item)}
      pressable={true}
      className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden w-full text-left cursor-pointer"
      rounded="2xl"
      color="base-100"
    >
      <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
        <p className="text-caption font-semibold uppercase tracking-wide text-base-content/70 truncate w-full">
          {item.brand.name}
        </p>
        <h3 className="font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
          {item.name}
        </h3>
      </div>

      <div className="relative -mx-5 my-0.5">
        <div className="border-t-2 border-dashed border-base-300" />
        <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
        <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
      </div>

      <MetricStats
        items={[
          {
            label: "Est. Price",
            value: formatedPrice || "-",
          },
          {
            label: "Category",
            value: item.category.name || "-",
          },
          {
            label: "Priority",
            value: item.priority || "-",
          },
        ]}
        className="bg-base-200/60 rounded-xl p-2"
      />

      {(item.reason || activeStoreLink) && (
        <div className="flex flex-col gap-3 mt-1">
          {item.reason && (
            <div className="p-3 text-base-content bg-base-200/60 rounded-xl text-caption border-l-4 border-primary italic">
              &quot;{item.reason}&quot;
            </div>
          )}

          {activeStoreLink && (
            <div className="border-t border-base-200 pt-3 flex items-center justify-between gap-2 text-caption text-base-content/75">
              <div className="flex items-center gap-2 min-w-0">
                <Storefront
                  size={14}
                  weight="bold"
                  className="shrink-0 text-base-content/50"
                />
                <span className="truncate font-medium">
                  {item.brand.name} Store
                </span>
              </div>
              <a
                href={activeStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 shrink-0 px-2 py-1 bg-primary/10 hover:bg-primary/20 text-base-content rounded-lg text-caption font-bold transition-colors"
              >
                <span>Visit</span>
                <ArrowSquareOut size={12} weight="bold" />
              </a>
            </div>
          )}
        </div>
      )}

      {onPurchaseClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPurchaseClick(item);
          }}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-content hover:bg-primary/90 font-bold rounded-xl text-caption transition-colors cursor-pointer"
        >
          <ShoppingCartSimple size={16} weight="bold" />
          <span>Mark as Purchased</span>
        </button>
      )}
    </CardBox>
  );
}
