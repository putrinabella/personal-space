"use client";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface FinanceCardProps {
  item: any;
  label?: string;
}

export default function FinanceCard({
  item,
  label = "Account",
}: FinanceCardProps) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <CardBox
      className="p-4 md:p-6 flex flex-col gap-3 w-48 min-w-48 shrink-0"
      rounded="2xl"
      color={item.color}
    >
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <IconRenderer name={item.iconSlug} size={24} weight="bold" />
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="opacity-50 hover:opacity-100 transition-opacity p-1 cursor-pointer"
        >
          {showBalance ? <Eye size={20} /> : <EyeSlash size={20} />}
        </button>
      </div>

      <div className="grow wrap-break-word">
        <h4 className="heading-h4 uppercase leading-tight truncate">
          {item.name}
        </h4>
        <p className="text-caption font-semibold uppercase tracking-wider opacity-70 mt-0.5">
          {item.type} {label}
        </p>
      </div>

      <div className="flex items-center gap-1.5 min-w-0 pt-1">
        <span className="text-data font-bold opacity-70 shrink-0">Rp</span>
        <p className="heading-h3 font-black truncate">
          {showBalance
            ? formatRupiah(item.currentBalance).replace("Rp", "").trim()
            : "••••••••"}
        </p>
      </div>
    </CardBox>
  );
}
