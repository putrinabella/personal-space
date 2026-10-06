"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import ModalBox from "@/shared/components/ModalBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  Storefront,
  Star,
  Package,
  ClockCountdown,
  PencilSimple,
  Eye,
  ShieldWarning,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { ProductEntry } from "../product/product.types";
import ActionButton from "@/shared/components/ActionButton";
import UnitCard from "./UnitCard";
import { UNIT_STATUS_CONFIG } from "../constants/status-option";
import MetricStats from "@/shared/components/MetricStats";

interface ProductCardProps {
  item: ProductEntry;
  onDetailClick?: (item: ProductEntry) => void;
}

export default function ProductCard({ item, onDetailClick }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const units = item.units || [];
  // const activeUnitsCount = units.filter((u) => u.status === "active").length;
  const backupUnitsCount = units.filter((u) => u.status === "backup").length;

  const numericPrice =
    typeof units[0]?.price === "string"
      ? parseFloat(units[0].price)
      : units[0]?.price || 0;

  const handleCardClick = () => {
    if (onDetailClick) {
      onDetailClick(item);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <CardBox
        onClick={handleCardClick}
        pressable={true}
        className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden w-full text-left cursor-pointer"
        rounded="2xl"
        color="base-100"
      >
        <div className="flex flex-row justify-between items-start w-full gap-4">
          <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
            {(item.brand?.name || item.category?.name) && (
              <p className="text-caption font-semibold uppercase tracking-wide text-base-content truncate w-full">
                {[item.brand?.name, item.category?.name]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}
            <h3 className="font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
              {item.name}
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
            {/* {activeUnitsCount > 0 && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-caption font-bold rounded-lg ${UNIT_STATUS_CONFIG.active.className}`}
              >
                <CheckCircle size={12} weight="bold" />
                {activeUnitsCount} Active
              </span>
            )} */}
            {backupUnitsCount > 0 && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-caption font-bold rounded-lg ${UNIT_STATUS_CONFIG.backup.className}`}
              >
                <ClockCountdown size={12} weight="bold" />
                {backupUnitsCount} Backup
              </span>
            )}
            {units.length === 0 && (
              <span className="text-caption italic text-base-content/40">
                No units
              </span>
            )}
          </div>
        </div>

        <div className="relative -mx-5 my-0.5">
          <div className="border-t-2 border-dashed border-base-300" />
          <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
          <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
        </div>

        <div className="grid grid-cols-3 gap-2 bg-base-200/60 p-3 rounded-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-caption uppercase tracking-widest text-base-content/70">
              Price
            </span>
            <span className="text-data text-base-content mt-0.5 truncate w-full px-1">
              {formatRupiah(numericPrice)}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center border-x border-base-300">
            <span className="text-caption uppercase tracking-widest text-base-content/70">
              Stock
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Package size={14} weight="bold" />
              <span className="text-data text-base-content">
                {item.quantity ?? units.length ?? 0}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-caption uppercase tracking-widest text-base-content/70">
              Rating
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={14} weight="fill" className="text-warning" />
              <span className="text-data text-base-content">
                {item.rating || "-"}
              </span>
            </div>
          </div>
        </div>
        {(item.concerns?.length || item.brand?.storeLink) && (
          <div className="flex flex-col gap-3 mt-1">
            {/* {item.concerns && item.concerns.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.concerns.map((concern) => (
                  <span
                    key={concern.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent-content border border-accent/30 text-caption rounded-md"
                  >
                    <Sparkle size={10} weight="bold" />
                    {concern.name}
                  </span>
                ))}
              </div>
            )} */}

            {item.brand?.storeLink && (
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
                  href={item.brand.storeLink}
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
      </CardBox>

      <ModalBox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={item.name}
        subtitle={
          item.brand?.name
            ? `${item.brand.name} • ${item.category?.name || "Skincare"}`
            : item.category?.name
        }
        maxWidth="xl"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-base-200/60 p-3 rounded-xl">
            <span className="text-caption font-bold text-base-content/70">
              Manage Product Data
            </span>
            <div className="flex gap-2">
              <ActionButton
                icon={Eye}
                size={14}
                to={`/beauty/dashboard/product/${item.id}`}
              />
              <ActionButton
                icon={PencilSimple}
                color="warning"
                size={14}
                to={`/beauty/dashboard/product/${item.id}/edit`}
              />
            </div>
          </div>
          <MetricStats
            items={[
              {
                label: "Rating",
                value: item.rating || "-",
                icon: <Star size={14} weight="fill" className="text-warning" />,
              },
              {
                label: "Stock",
                value: item.quantity,
                icon: (
                  <Package
                    size={14}
                    weight="bold"
                    className="text-base-content/80"
                  />
                ),
              },
              {
                label: "Min Stock",
                value: item.minStock,
                icon: (
                  <ShieldWarning
                    size={14}
                    weight="bold"
                    className="text-error/80"
                  />
                ),
              },
            ]}
            className="bg-base-200/60 rounded-xl p-2"
          />
          {item.notes && (
            <div className="p-3 text-base-content bg-base-200/60 rounded-xl text-caption border-l-4 border-primary">
              &quot;{item.notes}&quot;
            </div>
          )}
          <div className="flex flex-col gap-2">
            {units.length > 0 ? (
              units.map((unit: any, idx: number) => (
                <UnitCard
                  key={unit.id || idx}
                  unit={unit}
                  idx={idx}
                  statusConfig={UNIT_STATUS_CONFIG}
                />
              ))
            ) : (
              <p className="text-caption italic py-4 text-center text-base-content/50">
                No active units recorded for this item.
              </p>
            )}
          </div>
        </div>
      </ModalBox>
    </>
  );
}
