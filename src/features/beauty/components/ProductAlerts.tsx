"use client";
import CardBox from "@/shared/components/CardBox";
import { WarningCircle, CalendarBlank } from "@phosphor-icons/react";
import { AlertUnitEntry } from "@/features/beauty/alert/alert.types";
interface ProductAlertsProps {
  loadingAlerts: boolean;
  totalAlerts: number;
  alertGridClass?: string;
  expiredUnits?: AlertUnitEntry[];
  expiringSoon?: AlertUnitEntry[];
  paoWarning?: AlertUnitEntry[];
}
export default function ProductAlerts({
  loadingAlerts,
  totalAlerts,
  alertGridClass = "grid grid-cols-1 md:grid-cols-3 gap-4",
  expiredUnits = [],
  expiringSoon = [],
  paoWarning = [],
}: ProductAlertsProps) {
  if (loadingAlerts || totalAlerts <= 0) {
    return null;
  }
  return (
    <div className={alertGridClass}>
      {expiredUnits.length > 0 && (
        <CardBox className="p-4 flex flex-col gap-3" rounded="2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-error font-bold text-sm">
              <WarningCircle size={20} weight="fill" />
              <span>Expired Products</span>
            </div>
            <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded-full">
              {expiredUnits.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {expiredUnits.slice(0, 2).map((item) => (
              <div
                key={item.unit.id}
                className="flex items-center justify-between gap-3 bg-base-100 p-2.5 rounded-xl text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-[10px] text-base-content/50 truncate">
                    {item.brand?.name || "No Brand"}
                  </p>
                </div>
                <span className="shrink-0 text-error font-bold">
                  {Math.abs(item.unit.daysLeft ?? 0)} days ago
                </span>
              </div>
            ))}
          </div>
        </CardBox>
      )}

      {expiringSoon.length > 0 && (
        <CardBox className="p-4 flex flex-col gap-3" rounded="2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-warning font-bold text-sm">
              <WarningCircle size={20} weight="fill" />
              <span>Expiring Soon</span>
            </div>
            <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded-full">
              {expiringSoon.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {expiringSoon.slice(0, 2).map((item) => (
              <div
                key={item.unit.id}
                className="flex items-center justify-between gap-3 bg-base-100 p-2.5 rounded-xl text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-[10px] text-base-content/50 truncate">
                    {item.brand?.name || "No Brand"}
                  </p>
                </div>
                <span className="shrink-0 text-warning font-bold">
                  {item.unit.daysLeft} days left
                </span>
              </div>
            ))}
          </div>
        </CardBox>
      )}

      {paoWarning.length > 0 && (
        <CardBox className="p-4 flex flex-col gap-3" rounded="2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-info font-bold text-sm">
              <CalendarBlank size={20} weight="fill" />
              <span>PAO Limit Warning</span>
            </div>
            <span className="text-xs font-bold text-info bg-info/10 px-2 py-1 rounded-full">
              {paoWarning.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {paoWarning.slice(0, 2).map((item) => (
              <div
                key={item.unit.id}
                className="flex items-center justify-between gap-3 bg-base-100 p-2.5 rounded-xl text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="text-[10px] text-base-content/50">
                    Period After Opening
                  </p>
                </div>
                <span className="shrink-0 text-info font-bold">
                  {item.unit.paoProgress}%
                </span>
              </div>
            ))}
          </div>
        </CardBox>
      )}
    </div>
  );
}
