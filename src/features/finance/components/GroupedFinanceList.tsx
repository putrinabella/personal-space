"use client";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface ItemData {
  id: string;
  name: string;
  type: string; // Contoh: "cash", "bank", "ewallet"
  currentBalance?: number | string;
  balance?: number | string;
  currency?: string;
  color?: string;
  iconSlug?: string;
  isArchived?: boolean;
}

interface GroupedFinanceListProps {
  items: ItemData[];
}

export default function GroupedFinanceList({ items }: GroupedFinanceListProps) {
  // State diatur bernilai true secara default agar langsung tersembunyi
  const [hiddenTypes, setHiddenTypes] = useState<Record<string, boolean>>({});

  const toggleHideType = (typeKey: string) => {
    setHiddenTypes((prev) => ({
      ...prev,
      [typeKey]: !prev[typeKey],
    }));
  };

  // 1. Kelompokkan item berdasarkan 'type'
  const groupedData = items.reduce(
    (acc, item) => {
      const type = item.type ? item.type.toLowerCase() : "other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    },
    {} as Record<string, ItemData[]>,
  );

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 w-full">
      {Object.entries(groupedData).map(([typeKey, groupItems]) => {
        const categoryTitle =
          typeKey.charAt(0).toUpperCase() + typeKey.slice(1);

        const totalAssets = groupItems.reduce((sum, item) => {
          const val = Number(item.currentBalance ?? item.balance ?? 0);
          return sum + val;
        }, 0);

        // Default bernilai true (tersembunyi) kecuali user mengubahnya menjadi false
        const isHidden = hiddenTypes[typeKey] ?? true;

        return (
          <CardBox
            key={typeKey}
            className="flex flex-col border-2  overflow-hidden"
            rounded="2xl"
            color="base-100"
          >
            {/* Header Kategori */}
            <div className="px-5 py-3.5 bg-secondary border-b-2 border-black flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-wider text-base-content">
                {categoryTitle}
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-base-content/70">
                  Assets: {isHidden ? "••••••••" : formatRupiah(totalAssets)}
                </span>
                <button
                  onClick={() => toggleHideType(typeKey)}
                  className="w-7 h-7 rounded-lg bg-base-100 border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 transition-all cursor-pointer shrink-0"
                  aria-label="Toggle Category Visibility"
                >
                  {isHidden ? (
                    <EyeSlash size={13} weight="bold" />
                  ) : (
                    <Eye size={13} weight="bold" />
                  )}
                </button>
              </div>
            </div>

            {/* List Item di dalam Kategori */}
            <div className="flex flex-col divide-y-2 divide-black/10">
              {groupItems.map((item) => {
                const iconColor = item.color || "#fde047";
                const iconName = item.iconSlug || "Wallet";
                const balanceVal = Number(
                  item.currentBalance ?? item.balance ?? 0,
                );
                const currencyText = item.currency || "IDR";

                return (
                  <div
                    key={item.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-base-200/40 transition-colors"
                  >
                    {/* Sisi Kiri: Icon & Nama */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        style={{ backgroundColor: iconColor }}
                      >
                        <IconRenderer name={iconName} size={22} weight="bold" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <p className="font-black text-base-content text-base truncate">
                          {item.name}
                        </p>
                        <span className="text-caption font-bold text-base-content/50 uppercase">
                          {currencyText}
                        </span>
                      </div>
                    </div>

                    {/* Sisi Kanan: Saldo */}
                    <div className="text-right shrink-0">
                      <p className="font-black text-base-content text-body">
                        {isHidden ? "••••••••" : formatRupiah(balanceVal)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBox>
        );
      })}
    </div>
  );
}
