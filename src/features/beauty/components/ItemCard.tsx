// import CardBox from "@/shared/components/CardBox";
// import IconRenderer from "@/shared/components/IconRenderer";
// import { formatRupiah } from "@/utils/rupiahFormatter";
// import { Storefront, Sparkle, Star, Package } from "@phosphor-icons/react";
// import { ItemsEntry } from "../items/items.types";

// interface BeautyItemCardProps {
//   item: ItemsEntry;
//   onDetailClick?: (item: ItemsEntry) => void;
// }

// export default function BeautyItemCard({
//   item,
//   onDetailClick,
// }: BeautyItemCardProps) {
//   const categoryColor = item.category?.color || "var(--color-primary)";
//   const categoryIcon = item.category?.iconSlug || "FlowerLotus";

//   // Label dan warna untuk status produk
//   const statusConfig = {
//     active: { label: "Active", className: "bg-success text-success-content" },
//     backup: { label: "Backup", className: "bg-warning text-warning-content" },
//     finished: {
//       label: "Finished",
//       className: "bg-base-300 text-base-content/70",
//     },
//     discarded: { label: "Discarded", className: "bg-error text-error-content" },
//   };

//   const currentStatus =
//     statusConfig[item.status as keyof typeof statusConfig] ||
//     statusConfig.active;
//   const numericPrice =
//     typeof item.price === "string" ? parseFloat(item.price) : item.price;

//   return (
//     <CardBox
//       onClick={() => onDetailClick?.(item)}
//       pressable={!!onDetailClick}
//       className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden w-full text-left"
//       rounded="2xl"
//       color="base-100"
//     >
//       {/* Badge Status di Pojok Kanan Atas */}
//       <div className="absolute top-4 right-4 z-10">
//         <span
//           className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm ${currentStatus.className}`}
//         >
//           {currentStatus.label}
//         </span>
//       </div>

//       {/* Bagian Header: Icon Kategori & Nama Produk + Brand */}
//       <div className="flex items-start gap-3.5 pr-20">
//         <div
//           className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-105"
//           style={{ backgroundColor: categoryColor }}
//         >
//           <IconRenderer
//             name={categoryIcon}
//             size={22}
//             weight="bold"
//             className="text-black"
//           />
//         </div>

//         <div className="flex flex-col items-start min-w-0 flex-1">
//           {item.brand?.name && (
//             <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 truncate w-full">
//               {item.brand.name}
//             </span>
//           )}
//           <h3 className="text-lg font-extrabold tracking-tight text-base-content group-hover:text-primary transition-colors truncate w-full">
//             {item.name}
//           </h3>
//           {item.category?.name && (
//             <span className="text-xs font-semibold text-primary mt-0.5">
//               {item.category.name}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Garis Pemisah Bergaya Putus-Putus (opsional untuk estetika) */}
//       <div className="relative -mx-5">
//         <div className="border-t-2 border-dashed border-base-300" />
//         <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
//         <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
//       </div>

//       {/* Bagian Informasi Utama (Harga, Stok, Rating, PAO) */}
//       <div className="grid grid-cols-3 gap-2 bg-base-200/60 p-3 rounded-xl">
//         <div className="flex flex-col items-center justify-center text-center">
//           <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
//             Price
//           </span>
//           <span className="text-sm font-black text-base-content mt-0.5">
//             {formatRupiah(numericPrice)}
//           </span>
//         </div>

//         <div className="flex flex-col items-center justify-center text-center border-x border-base-300">
//           <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
//             Stock
//           </span>
//           <div className="flex items-center gap-1 mt-0.5">
//             <Package size={14} weight="bold" />
//             <span className="text-sm font-black text-base-content">
//               {item.quantity}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col items-center justify-center text-center">
//           <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
//             Rating
//           </span>
//           <div className="flex items-center gap-1 mt-0.5">
//             <Star size={14} weight="fill" className="text-warning" />
//             <span className="text-sm font-black text-base-content">
//               {item.rating || "-"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Skin Concerns Badges */}
//       {item.concerns && item.concerns.length > 0 && (
//         <div className="flex items-center gap-1.5 flex-wrap">
//           {item.concerns.map((concern) => (
//             <span
//               key={concern.id}
//               className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent-content border border-accent/40 text-xs font-semibold rounded-md"
//             >
//               <Sparkle size={10} weight="bold" />
//               {concern.name}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Footer Info: Nama Toko */}
//       {item.store?.name && (
//         <div className="border-t border-base-300 pt-3 mt-1 flex items-center gap-2 text-xs text-base-content/70">
//           <Storefront
//             size={14}
//             weight="bold"
//             className="shrink-0 text-base-content/50"
//           />
//           <span className="truncate font-medium">{item.store.name}</span>
//         </div>
//       )}
//     </CardBox>
//   );
// }
"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import ModalBox from "@/shared/components/ModalBox";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { formatDateIndo } from "@/utils/dateFormatter";
import { Storefront, Sparkle, Star, Package } from "@phosphor-icons/react";
import { ItemsEntry } from "../items/items.types";

interface BeautyItemCardProps {
  item: ItemsEntry;
  onDetailClick?: (item: ItemsEntry) => void;
}

export default function BeautyItemCard({
  item,
  onDetailClick,
}: BeautyItemCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryColor = item.category?.color || "var(--color-primary)";
  const categoryIcon = item.category?.iconSlug || "FlowerLotus";

  // Label dan warna untuk status produk/unit
  const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-success text-success-content" },
    backup: { label: "Backup", className: "bg-warning text-warning-content" },
    finished: {
      label: "Finished",
      className: "bg-base-300 text-base-content/70",
    },
    discarded: { label: "Discarded", className: "bg-error text-error-content" },
  };

  // Ambil status dari unit pertama atau default ke active
  const firstUnitStatus = item.units?.[0]?.status || "active";
  const currentStatus = statusConfig[firstUnitStatus] || statusConfig.active;

  const numericPrice =
    typeof item.units?.[0]?.price === "string"
      ? parseFloat(item.units[0].price)
      : item.units?.[0]?.price || 0;

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
        {/* Badge Status di Pojok Kanan Atas */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm ${currentStatus.className}`}
          >
            {currentStatus.label}
          </span>
        </div>

        {/* Bagian Header: Icon Kategori & Nama Produk + Brand */}
        <div className="flex items-start gap-3.5 pr-20">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-105"
            style={{ backgroundColor: categoryColor }}
          >
            <IconRenderer
              name={categoryIcon}
              size={22}
              weight="bold"
              className="text-black"
            />
          </div>

          <div className="flex flex-col items-start min-w-0 flex-1">
            {item.brand?.name && (
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 truncate w-full">
                {item.brand.name}
              </span>
            )}
            <h3 className="text-lg font-extrabold tracking-tight text-base-content group-hover:text-primary transition-colors truncate w-full">
              {item.name}
            </h3>
            {item.category?.name && (
              <span className="text-xs font-semibold text-primary mt-0.5">
                {item.category.name}
              </span>
            )}
          </div>
        </div>

        {/* Garis Pemisah Bergaya Putus-Putus */}
        <div className="relative -mx-5">
          <div className="border-t-2 border-dashed border-base-300" />
          <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
          <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
        </div>

        {/* Bagian Informasi Utama (Harga, Stok, Rating) */}
        <div className="grid grid-cols-3 gap-2 bg-base-200/60 p-3 rounded-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
              Price
            </span>
            <span className="text-sm font-black text-base-content mt-0.5">
              {formatRupiah(numericPrice)}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center border-x border-base-300">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
              Stock
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Package size={14} weight="bold" />
              <span className="text-sm font-black text-base-content">
                {item.quantity ?? item.units?.length ?? 0}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/60">
              Rating
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={14} weight="fill" className="text-warning" />
              <span className="text-sm font-black text-base-content">
                {item.rating || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Skin Concerns Badges */}
        {item.concerns && item.concerns.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.concerns.map((concern) => (
              <span
                key={concern.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent-content border border-accent/40 text-xs font-semibold rounded-md"
              >
                <Sparkle size={10} weight="bold" />
                {concern.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer Info: Nama Toko */}
        {item.store?.name && (
          <div className="border-t border-base-300 pt-3 mt-1 flex items-center gap-2 text-xs text-base-content/70">
            <Storefront
              size={14}
              weight="bold"
              className="shrink-0 text-base-content/50"
            />
            <span className="truncate font-medium">{item.store.name}</span>
          </div>
        )}
      </CardBox>

      {/* --- MODAL DETAIL & UNIT LIST --- */}
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
        <div className="flex flex-col gap-4">
          {/* Notes Master Produk */}
          {item.notes && (
            <div className="p-3 bg-base-200/50 rounded-xl text-xs text-base-content/80 italic border-l-4 border-primary">
              &quot;{item.notes}&quot;
            </div>
          )}

          {/* Daftar Semua Unit Fisik / Batch */}
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-base-content/60">
              Physical Units / Batches ({item.units?.length || 0})
            </h4>

            {item.units && item.units.length > 0 ? (
              <div className="flex flex-col gap-3">
                {item.units.map((unit: any, idx: number) => {
                  const unitStatus =
                    statusConfig[unit.status] || statusConfig.active;
                  return (
                    <div
                      key={unit.id || idx}
                      className="p-3.5 bg-base-200 rounded-2xl border border-base-300 flex flex-col gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-base-content/70">
                          Batch #{idx + 1}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${unitStatus.className}`}
                        >
                          {unitStatus.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-base-content/60 font-semibold uppercase">
                            Price
                          </span>
                          <span className="font-bold text-base-content">
                            {formatRupiah(unit.price)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-base-content/60 font-semibold uppercase">
                            PAO
                          </span>
                          <span className="font-bold text-base-content">
                            {unit.paoMonths ? `${unit.paoMonths} Months` : "-"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-base-content/60 font-semibold uppercase">
                            Purchased
                          </span>
                          <span className="font-bold text-base-content">
                            {formatDateIndo(unit.purchaseDate) || "-"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-base-content/60 font-semibold uppercase">
                            Expiry Date
                          </span>
                          <span className="font-bold text-error">
                            {formatDateIndo(unit.expiryDate) || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-base-content/50 italic py-2">
                No active units recorded for this item.
              </p>
            )}
          </div>
        </div>
      </ModalBox>
    </>
  );
}
