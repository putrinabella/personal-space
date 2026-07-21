"use client";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

export default function AccountCard({ acc }: { acc: any }) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <CardBox
      className="p-4 md:p-6 flex flex-col gap-2 min-w-40"
      rounded="2xl"
      color={acc.color}
    >
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <IconRenderer name={acc.iconSlug} size={24} weight="bold" />
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="opacity-50 hover:opacity-100 transition-opacity p-1"
          aria-label="Toggle visibility"
        >
          {showBalance ? <Eye size={20} /> : <EyeSlash size={20} />}
        </button>
      </div>

      <div>
        <p className="font-black text-lg uppercase">{acc.name}</p>
        <p className="text-sm font-medium opacity-70 capitalize">
          {acc.type} Account
        </p>
      </div>

      <div className="mt-2">
        <p className="text-sm font-bold opacity-70">Rp</p>
        <p className="text-xl font-black">
          {showBalance
            ? formatRupiah(acc.currentBalance).replace("Rp", "")
            : "••••••••"}
        </p>
      </div>
    </CardBox>
  );
}
