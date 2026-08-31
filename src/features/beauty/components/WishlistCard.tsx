"use client";

import CardBox from "@/shared/components/CardBox";
import MetricStats from "@/shared/components/MetricStats";
import ModalBox from "@/shared/components/ModalBox";
import { formatDateIndo } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { ArrowSquareOut, ShoppingCartSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { WishlistEntry } from "../wishlist/wishlist.types";

interface WishlistCardProps {
  item: {
    id: string;
    name: string;
    estimatedPrice: string | number;
    priority: "High" | "Medium" | "Low";
    storeLink?: string | null;
    reason?: string | null;
    createdAt: string;
    brand: {
      id: string;
      name: string;
      storeLink?: string | null;
    };
    category: {
      id: string;
      name: string;
    };
  };
  onPurchaseSubmit?: (formData: any) => void; // Handler saat submit form pembelian
  onEditSubmit?: (formData: any) => void; // Handler saat submit form edit

  onDetailClick?: (item: WishlistEntry) => void;
}

export default function WishlistCard({
  item,
  onPurchaseSubmit,
  onEditSubmit,
}: WishlistCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const activeStoreLink = item.storeLink || item.brand.storeLink;
  const formatedPrice = formatRupiah(item.estimatedPrice);

  return (
    <>
      {/* CARD UTAMA: Klik card untuk membuka modal Edit */}
      <CardBox
        onClick={() => setIsEditModalOpen(true)}
        pressable={true}
        className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden w-full text-left cursor-pointer"
        rounded="2xl"
        color="base-100"
      >
        <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
          <p className="text-caption font-semibold uppercase tracking-wide text-base-content/70 truncate w-full">
            {item.brand.name}
          </p>
          <h3 className="font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
            {item.name}
          </h3>
        </div>

        <div className="relative -mx-5 my-0.5">
          <div className="border-t-2 border-dashed border-base-300" />
          <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
          <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
        </div>

        <MetricStats
          items={[
            {
              label: "Est. Price",
              value: formatedPrice || "-",
            },
            {
              label: "Category",
              value: item.category.name || "-",
            },
            {
              label: "Priority",
              value: item.priority || "-",
            },
          ]}
          className="bg-base-200/60 rounded-xl p-2"
        />

        {(item.reason || activeStoreLink || item.createdAt) && (
          <div className="flex flex-col gap-3 mt-1">
            {item.reason && (
              <div className="p-3 text-base-content bg-base-200/60 rounded-xl text-caption border-l-4 border-primary italic">
                &quot;{item.reason}&quot;
              </div>
            )}

            {(activeStoreLink || item.createdAt) && (
              <div className="border-t border-base-200 pt-3 flex items-center justify-between gap-3 text-caption text-base-content/75">
                {item.createdAt && (
                  <span className="text-base-content/60 font-medium shrink-0">
                    {formatDateIndo(item.createdAt, true)}
                  </span>
                )}
                {activeStoreLink && (
                  <a
                    href={activeStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 shrink-0 px-2 py-0.5 bg-primary/10 hover:bg-primary/20 text-base-content rounded-md text-caption font-bold transition-colors ml-1"
                  >
                    <span>Visit</span>
                    <ArrowSquareOut size={11} weight="bold" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* TOMBOL TRIGGER: Membuka modal form pembelian (Mark as Purchased) */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah modal edit ikut terbuka saat tombol dibeli diklik
            setIsPurchaseModalOpen(true);
          }}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-content hover:bg-primary/90 font-bold rounded-xl text-caption transition-colors cursor-pointer"
        >
          <ShoppingCartSimple size={16} weight="bold" />
          <span>Mark as Purchased</span>
        </button>
      </CardBox>

      {/* MODAL 1: Form Edit Wishlist */}
      <ModalBox
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Wishlist Item"
        subtitle={`${item.brand.name} • ${item.name}`}
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4 py-2">
          {/* Tempatkan form input edit wishlist di sini */}
          <p className="text-caption text-base-content/70">
            Form untuk mengubah detail wishlist (Nama, Harga Estimasi,
            Prioritas, dll).
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-caption font-bold bg-base-200 hover:bg-base-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onEditSubmit?.(item);
                setIsEditModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-caption font-bold bg-primary text-primary-content"
            >
              Save Changes
            </button>
          </div>
        </div>
      </ModalBox>

      {/* MODAL 2: Form Mark as Purchased (Pindah ke Inventaris) */}
      <ModalBox
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Confirm Purchase"
        subtitle={`Pindahkan "${item.name}" ke inventaris produk aktif`}
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4 py-2">
          {/* Tempatkan form input pembelian (Harga Aktual, Tanggal Beli, Tanggal Kedaluwarsa, dll) */}
          <p className="text-caption text-base-content/70">
            Item ini akan dihapus dari wishlist dan dicatat sebagai stok produk
            baru di inventaris Anda.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="px-4 py-2 rounded-xl text-caption font-bold bg-base-200 hover:bg-base-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onPurchaseSubmit?.(item);
                setIsPurchaseModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-caption font-bold bg-primary text-primary-content"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </ModalBox>
    </>
  );
}
