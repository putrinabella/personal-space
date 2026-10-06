"use client";

import { formatRupiah } from "@/utils/rupiahFormatter";
import { formatDateIndo } from "@/utils/dateFormatter";
import {
  PencilSimple,
  DropHalfBottom,
  Warning,
  XCircle,
  Trash,
} from "@phosphor-icons/react";
import ActionButton from "@/shared/components/ActionButton";
import { useUnitDelete } from "../unit/hooks/useUnitDelete";
import { UnitEntry } from "../unit/unit.types";

interface UnitCardProps {
  unit: UnitEntry;
  idx: number;
  statusConfig: Record<string, { label: string; className: string }>;
}

export default function UnitCard({ unit, idx, statusConfig }: UnitCardProps) {
  const unitStatus = statusConfig[unit.status] || statusConfig.active;
  const paoProgress = unit.paoProgress;

  // Mengambil nilai boolean langsung dari Backend
  const isExpired = unit.isExpired ?? false;
  const isExpiringSoon = unit.isExpiringSoon ?? false;

  const { handleDelete } = useUnitDelete();
  return (
    <div className="p-4 bg-base-100 rounded-2xl border-2 border-base-300 shadow-sm flex flex-col gap-3 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between pb-2 border-b border-base-200">
        <span className="text-caption font-black text-base-content/80 tracking-wider">
          BATCH #{idx + 1}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 text-[10px] uppercase rounded-md ${unitStatus.className}`}
          >
            {unitStatus.label}
          </span>
          <ActionButton
            icon={Trash}
            color="error"
            size={12}
            onClick={() => handleDelete(unit.id)}
          />
          <ActionButton
            icon={PencilSimple}
            color="warning"
            size={12}
            to={`/beauty/dashboard/product/unit/${unit.id}/edit`}
          />
        </div>
      </div>

      {/* --- Alert for Expired or Expiring Soon --- */}
      {isExpired && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-error/15 border border-error/30 rounded-xl text-error text-[11px] font-bold">
          <XCircle size={15} weight="bold" />
          <span>Expired {Math.abs(unit.daysLeft)} days ago!</span>
        </div>
      )}

      {!isExpired && isExpiringSoon && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/15 border border-warning/30 rounded-xl text-warning-content text-[11px] font-bold">
          <Warning size={15} weight="bold" className="text-warning" />
          <span>Expiring in {unit.daysLeft} days</span>
        </div>
      )}

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
          <span
            className={`text-data font-semibold mt-0.5 ${isExpired ? "text-error font-bold" : "text-base-content"}`}
          >
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
}
