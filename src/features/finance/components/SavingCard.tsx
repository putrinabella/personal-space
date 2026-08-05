import { CheckCircle } from "@phosphor-icons/react";
import { formatRupiah } from "@/utils/rupiahFormatter";
import CardBox from "@/shared/components/CardBox";
import { SavingEntry } from "../saving/saving.types";

interface SavingCardProps {
  saving: SavingEntry;
}

export default function SavingCard({ saving }: SavingCardProps) {
  const targetAmount = parseFloat(saving.targetAmount || "0");
  const currentBalance = parseFloat(saving.pocket?.currentBalance || "0");

  const percentage =
    targetAmount > 0 ? (currentBalance / targetAmount) * 100 : 0;
  const clampedPercentage = Math.min(percentage, 100);
  const isCompleted = saving.isCompleted || percentage >= 100;

  const cardColor = saving.pocket?.color || "#f87171";
  const savingName = saving.name || "Saving Goal";
  const pocketName = saving.pocket?.name;

  // Konfigurasi SVG Speedometer (240 derajat)
  const radius = 40;
  const arcLength = 2 * Math.PI * radius * (240 / 360);
  const strokeDashoffset = arcLength - (clampedPercentage / 100) * arcLength;

  return (
    <CardBox className="relative px-3 pb-3 pt-7 sm:p-4 mt-3" rounded="2xl">
      {/* Badge Status Completed di pojok kanan atas */}
      {isCompleted && (
        <div className="absolute top-0 right-4 bg-success/80 border-b-2 border-x-2 border-neutral px-2.5 py-1 rounded-b-xl shadow-sm z-10">
          <div className="flex items-center gap-1 text-caption font-bold">
            <CheckCircle size={12} weight="bold" />
            <span>Completed</span>
          </div>
        </div>
      )}

      {/* Container Utama: Flex Row di Desktop dengan item-center agar teks rata tengah secara vertikal */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Bagian Gauge Speedometer */}
        <div className="relative flex flex-col items-center justify-center shrink-0 pt-2 md:pt-0">
          <svg
            className="w-32 h-20 overflow-visible"
            viewBox="0 0 100 75"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Track */}
            <path
              d="M 18 62 A 40 40 0 1 1 82 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              className="text-base-300"
            />

            {/* Progress Path */}
            {clampedPercentage > 0 && (
              <path
                d="M 18 62 A 40 40 0 1 1 82 62"
                fill="none"
                stroke={cardColor}
                strokeWidth="9"
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeDashoffset}
              />
            )}
          </svg>

          {/* Angka Persentase Besar di dalam lengkungan */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
            <span className="text-xl font-header font-black text-base-content leading-tight">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Bagian Teks: Rata tengah di mobile, rata kiri di desktop dengan posisi center secara vertikal */}
        <div className="flex flex-col justify-center text-center md:text-left w-full gap-1">
          <h3 className="heading-h4 truncate w-full">{savingName}</h3>

          {pocketName && (
            <span className="text-caption text-base-content/70 font-semibold truncate w-full">
              Pocket:{" "}
              <span className="text-base-content font-bold">{pocketName}</span>
            </span>
          )}

          <div className="text-data truncate w-full">
            <span className="text-primary font-black">
              {formatRupiah(currentBalance)}
            </span>
            <span className="text-base-content/50 font-normal">
              {" "}
              / {formatRupiah(targetAmount)}
            </span>
          </div>
        </div>
      </div>
    </CardBox>
  );
}
