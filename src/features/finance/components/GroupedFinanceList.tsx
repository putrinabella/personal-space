"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface ItemData {
  id: string;
  name: string;
  type: string;
  currentBalance?: number | string;
  balance?: number | string;
  currency?: string;
  color?: string;
  iconSlug?: string;
  isArchived?: boolean;
}

interface GroupedFinanceListProps {
  items: ItemData[];
  baseRoute?: string;
  isClickable?: boolean;
  onItemClick?: (item: ItemData) => void;
}

export default function GroupedFinanceList({
  items,
  baseRoute = "/finance/dashboard/account",
  isClickable = true,
  onItemClick,
}: GroupedFinanceListProps) {
  const router = useRouter();
  const [hiddenTypes, setHiddenTypes] = useState<Record<string, boolean>>({});

  const toggleHideType = (typeKey: string) => {
    setHiddenTypes((prev) => ({
      ...prev,
      [typeKey]: !prev[typeKey],
    }));
  };

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

        const isHidden = hiddenTypes[typeKey] ?? true;

        return (
          <CardBox
            key={typeKey}
            className="flex flex-col overflow-hidden"
            rounded="2xl"
            color="base-100"
          >
            <div className="px-5 py-3.5 bg-secondary border-b-2 border-black flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-wider text-base-content">
                {categoryTitle}
              </span>

              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-base-content/70">
                  Assets: {isHidden ? "••••••••" : formatRupiah(totalAssets)}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHideType(typeKey);
                  }}
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

            <div className="flex flex-col divide-y-2 divide-black/10">
              {groupItems.map((item) => {
                const iconColor = item.color || "#fde047";
                const iconName = item.iconSlug || "Wallet";
                const balanceVal = Number(
                  item.currentBalance ?? item.balance ?? 0,
                );
                const currencyText = item.currency || "IDR";

                const handleCardClick = () => {
                  if (!isClickable) return;
                  if (onItemClick) {
                    onItemClick(item);
                  } else {
                    router.push(`${baseRoute}/${item.id}`);
                  }
                };

                return (
                  <div
                    key={item.id}
                    onClick={handleCardClick}
                    className={`p-4 flex items-center justify-between gap-4 transition-all ${
                      isClickable
                        ? "hover:bg-base-200/50 cursor-pointer group"
                        : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                          isClickable
                            ? "group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            : ""
                        }`}
                        style={{ backgroundColor: iconColor }}
                      >
                        <IconRenderer name={iconName} size={22} weight="bold" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <p
                          className={`font-black text-base-content text-base truncate transition-colors ${
                            isClickable ? "group-hover:text-primary" : ""
                          }`}
                        >
                          {item.name}
                        </p>
                        <span className="text-caption font-bold text-base-content/50 uppercase">
                          {currencyText}
                        </span>
                      </div>
                    </div>

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
{
  /* <GroupedFinanceList items={dataAccounts} isClickable={false} />; */
}
