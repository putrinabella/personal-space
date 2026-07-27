"use client";
import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface BalanceOverviewProps {
  title?: string; // Judul card, misal: "Total Balance"
  amount: number; // Nilai nominal saldo
  subLabel?: string; // Keterangan tambahan di samping judul, misal: "4 Accounts"
}

export default function BalanceOverview({
  title = "Total Balance",
  amount,
  subLabel,
}: BalanceOverviewProps) {
  const [showTotal, setShowTotal] = useState(false);

  return (
    <CardBox
      className="p-4 sm:p-5 flex items-center justify-between gap-4 w-full"
      rounded="2xl"
      color="primary"
    >
      {/* Sisi Kiri: Judul & SubLabel */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-caption font-black uppercase tracking-widest text-base-content/70">
          {title}
        </p>
        {subLabel && (
          <span className="text-caption font-bold text-base-content/60 uppercase tracking-wider">
            {subLabel}
          </span>
        )}
      </div>

      {/* Sisi Kanan: Nominal Saldo & Tombol Mata */}
      <div className="flex items-center gap-3 shrink-0">
        <h2 className="text-base sm:heading-h3 font-black text-base-content tracking-tight text-right">
          {showTotal ? formatRupiah(amount) : "Rp ••••••••"}
        </h2>

        <CardBox
          className="w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center font-bold shrink-0 border-2 border-black"
          rounded="xl"
          shadowSize="xs"
          color="secondary"
          onClick={() => setShowTotal(!showTotal)}
          pressable
        >
          {showTotal ? (
            <Eye size={18} weight="bold" />
          ) : (
            <EyeSlash size={18} weight="bold" />
          )}
        </CardBox>
      </div>
    </CardBox>
  );
}
