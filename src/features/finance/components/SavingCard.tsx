// import { CheckCircle } from "@phosphor-icons/react";
// import { formatRupiah } from "@/utils/rupiahFormatter";
// import CardBox from "@/shared/components/CardBox";
// import IconRenderer from "@/shared/components/IconRenderer";
// import { SavingEntry } from "../saving/saving.types";
// interface SavingCardProps {
//   saving: SavingEntry;
// }

// export default function SavingCard({ saving }: SavingCardProps) {
//   const targetAmount = parseFloat(saving.targetAmount || "0");
//   const currentBalance = parseFloat(saving.pocket?.currentBalance || "0");

//   // Hitung persentase ketercapaian
//   const percentage =
//     targetAmount > 0 ? (currentBalance / targetAmount) * 100 : 0;
//   const clampedPercentage = Math.min(percentage, 100);

//   const isCompleted = saving.isCompleted || percentage >= 100;

//   // Visual styling berdasarkan pocket atau default
//   const cardColor = saving.pocket?.color || "#f87171";
//   const iconSlug = saving.pocket?.iconSlug || "Vault";
//   const savingName = saving.name || "Saving Goal";
//   const description = saving.description;

//   // Konfigurasi SVG Circular Progress
//   const radius = 32;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset =
//     circumference - (clampedPercentage / 100) * circumference;

//   return (
//     <CardBox className="relative p-4 flex flex-col gap-3 mt-3" rounded="2xl">
//       {/* Badge Status di atas kanan */}
//       {isCompleted && (
//         <div className="absolute top-0 right-4 bg-success/80 px-2 py-1 rounded-b-lg shadow-sm z-10">
//           <div className="flex items-center gap-1 text-caption text-base-content font-bold">
//             <CheckCircle size={12} weight="bold" />
//             <span>Completed</span>
//           </div>
//         </div>
//       )}

//       {/* Header: Icon, Nama, dan Deskripsi */}
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3 min-w-0 flex-1">
//           <div
//             className="w-11 h-11 shrink-0 rounded-xl border-2 border-neutral flex items-center justify-center text-neutral shadow-[2px_2px_0px_0px_#4a3e3d]"
//             style={{ backgroundColor: cardColor }}
//           >
//             <IconRenderer name={iconSlug} size={20} weight="bold" />
//           </div>
//           <div className="min-w-0 flex-1">
//             <h3 className="heading-h4 truncate">{savingName}</h3>
//             {description && (
//               <p className="text-caption text-base-content/70 truncate">
//                 {description}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bagian Tengah: Diagram Lingkaran & Nominal */}
//       <div className="flex items-center justify-between bg-base-200/50 border-2 border-neutral/20 p-3 rounded-xl gap-4">
//         {/* Info Saldo */}
//         <div className="flex flex-col gap-1 min-w-0 flex-1">
//           <div>
//             <span className="text-caption uppercase font-semibold text-base-content/60 block">
//               Current / Target
//             </span>
//             <span className="text-data font-bold truncate block text-primary">
//               {formatRupiah(currentBalance)}
//             </span>
//             <span className="text-caption text-base-content/70 truncate block">
//               of {formatRupiah(targetAmount)}
//             </span>
//           </div>
//         </div>

//         {/* Circular Progress Diagram */}
//         <div className="relative flex items-center justify-center shrink-0">
//           <svg className="w-20 h-20 transform -rotate-90">
//             {/* Background Circle */}
//             <circle
//               cx="40"
//               cy="40"
//               r={radius}
//               stroke="currentColor"
//               strokeWidth="6"
//               className="text-base-300"
//               fill="transparent"
//             />
//             {/* Progress Circle */}
//             <circle
//               cx="40"
//               cy="40"
//               r={radius}
//               stroke="currentColor"
//               strokeWidth="6"
//               className="text-primary transition-all duration-500 ease-out"
//               fill="transparent"
//               strokeDasharray={circumference}
//               strokeDashoffset={strokeDashoffset}
//               strokeLinecap="round"
//             />
//           </svg>
//           {/* Teks Persentase di Tengah Ring */}
//           <div className="absolute flex flex-col items-center justify-center text-center">
//             <span className="text-caption font-black text-base-content">
//               {percentage.toFixed(0)}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Footer / Target Date jika ada */}
//       {saving.targetDate && (
//         <div className="flex justify-between items-center pt-1 border-t border-base-content/10 text-caption text-base-content/70">
//           <span>Target Date</span>
//           <span className="font-semibold">
//             {new Date(saving.targetDate).toLocaleDateString()}
//           </span>
//         </div>
//       )}
//     </CardBox>
//   );
// }

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
  const pocketName = saving.pocket.name;

  // Konfigurasi SVG Speedometer (240 derajat)
  const radius = 40;
  const arcLength = 2 * Math.PI * radius * (240 / 360);
  const strokeDashoffset = arcLength - (clampedPercentage / 100) * arcLength;

  return (
    <CardBox
      className="relative px-3 pb-3 pt-7  flex flex-col items-center justify-between mt-3 gap-1.5 "
      rounded="2xl"
    >
      {/* Badge Status Completed di pojok kanan atas */}
      {isCompleted && (
        <div className="absolute top-0 right-4 bg-success/80 border-b-2 border-x-2 border-neutral px-2.5 py-1 rounded-b-xl shadow-sm z-10">
          <div className="flex items-center gap-1 text-caption font-bold">
            <CheckCircle size={12} weight="bold" />
            <span>Completed</span>
          </div>
        </div>
      )}

      {/* Bagian Tengah: Gauge Speedometer */}
      <div className="relative flex flex-col items-center justify-center -my-2">
        <svg
          className="w-32 h-20 overflow-visible"
          viewBox="0 0 100 75"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Track (Selalu netral/abu-abu, tidak terpengaruh cardColor) */}
          <path
            d="M 18 62 A 40 40 0 1 1 82 62"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            className="text-base-300"
          />

          {/* Progress Path (Hanya dirender dan berwarna jika persentase > 0) */}
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
          {/* <span className="text-caption font-bold uppercase tracking-wider">
            Achieved
          </span> */}
        </div>
      </div>

      {/* Bagian Bawah: Judul & Nominal (Terkumpul / Target) */}
      <div className="flex flex-col items-center text-center w-full gap-0.5">
        <h3 className="heading-h4 truncate w-full">{savingName}</h3>{" "}
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
            / {formatRupiah(targetAmount)}
          </span>
        </div>
      </div>
    </CardBox>
  );
}
