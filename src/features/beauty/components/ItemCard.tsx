"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import ModalBox from "@/shared/components/ModalBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { formatDateIndo } from "@/utils/dateFormatter";
import {
  Storefront,
  Sparkle,
  Star,
  Package,
  CheckCircle,
  ClockCountdown,
  DropHalfBottom,
  PencilSimple,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ProductEntry } from "../product/product.types";

interface BeautyItemCardProps {
  item: ProductEntry;
  onDetailClick?: (item: ProductEntry) => void;
}

export default function BeautyItemCard({
  item,
  onDetailClick,
}: BeautyItemCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/beauty/dashboard/product/${item.id}/edit`);
  };

  const statusConfig: Record<string, { label: string; className: string }> = {
    active: {
      label: "Active",
      className:
        "bg-success/15 text-success border border-success/30 font-bold",
    },
    backup: {
      label: "Backup",
      className:
        "bg-warning/15 text-warning border border-warning/30 font-bold",
    },
    finished: {
      label: "Finished",
      className:
        "bg-base-300 text-base-content/70 border border-base-content/10 font-bold",
    },
    discarded: {
      label: "Discarded",
      className: "bg-error/15 text-error border border-error/30 font-bold",
    },
  };

  const units = item.units || [];
  const activeUnitsCount = units.filter((u) => u.status === "active").length;
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
              <span className="text-caption uppercase tracking-wider truncate w-full font-bold text-base-content/50">
                {[item.brand?.name, item.category?.name]
                  .filter(Boolean)
                  .join(" • ")}
              </span>
            )}
            <h3 className="heading-h3 text-base-content group-hover:text-primary transition-colors line-clamp-2 w-full font-extrabold tracking-tight">
              {item.name}
            </h3>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
            {activeUnitsCount > 0 && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-caption font-bold rounded-lg ${statusConfig.active.className}`}
              >
                <CheckCircle size={12} weight="bold" />
                {activeUnitsCount} Active
              </span>
            )}
            {backupUnitsCount > 0 && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-caption font-bold rounded-lg ${statusConfig.backup.className}`}
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

        {(item.concerns?.length || item.store?.name) && (
          <div className="flex flex-col gap-3 mt-1">
            {item.concerns && item.concerns.length > 0 && (
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
            )}

            {item.store?.name && (
              <div className="border-t border-base-200 pt-3 flex items-center gap-2 text-caption text-base-content/75">
                <Storefront
                  size={14}
                  weight="bold"
                  className="shrink-0 text-base-content/50"
                />
                <span className="truncate font-medium">{item.store.name}</span>
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
        <div className="flex items-center justify-between bg-base-200/60 p-3 rounded-xl mb-2">
          <span className="text-caption font-bold text-base-content/70">
            Manage Product Data
          </span>
          <button
            onClick={handleEditClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-content text-caption font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <PencilSimple size={14} weight="bold" />
            Edit Master Item
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {item.notes && (
            <div className="p-3.5 bg-base-200/60 rounded-xl text-body italic border-l-4 border-primary">
              &quot;{item.notes}&quot;
            </div>
          )}

          <div className="flex flex-col gap-3">
            {units.length > 0 ? (
              units.map((unit: any, idx: number) => {
                const unitStatus =
                  statusConfig[unit.status] || statusConfig.active;
                const paoProgress = unit.paoProgress;

                return (
                  <div
                    key={unit.id || idx}
                    className="p-4 bg-base-100 rounded-2xl border-2 border-base-300 shadow-sm flex flex-col gap-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-base-200">
                      <span className="text-caption font-black text-base-content/80 tracking-wider">
                        BATCH #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] uppercase rounded-md ${unitStatus.className}`}
                        >
                          {unitStatus.label}
                        </span>
                        <button
                          onClick={() =>
                            router.push(
                              `/beauty/dashboard/product/unit/${unit.id}/edit`,
                            )
                          }
                          className="text-base-content/60 hover:text-primary transition-colors p-1"
                          title="Edit this unit"
                        >
                          <PencilSimple size={14} weight="bold" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                          Price
                        </span>
                        <span className="text-data text-base-content font-semibold mt-0.5">
                          {formatRupiah(unit.price)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                          PAO
                        </span>
                        <span className="text-data text-base-content font-semibold mt-0.5">
                          {unit.paoMonths ? `${unit.paoMonths} Months` : "-"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                          Purchased
                        </span>
                        <span className="text-data text-base-content font-semibold mt-0.5">
                          {formatDateIndo(unit.purchaseDate) || "-"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50">
                          Expiry Date
                        </span>
                        <span className="text-data text-error font-semibold mt-0.5">
                          {formatDateIndo(unit.expiryDate) || "-"}
                        </span>
                      </div>
                    </div>

                    {paoProgress !== null && (
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-base-200/60 mt-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-base-content/70">
                          <span className="flex items-center gap-1">
                            <DropHalfBottom
                              size={13}
                              weight="bold"
                              className="text-primary"
                            />
                            PAO Usage Progress
                          </span>
                          <span className="font-bold">{paoProgress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-base-200 overflow-hidden p-0.5 border border-base-300">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              paoProgress >= 90
                                ? "bg-error"
                                : paoProgress >= 70
                                  ? "bg-warning"
                                  : "bg-success"
                            }`}
                            style={{ width: `${paoProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
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
