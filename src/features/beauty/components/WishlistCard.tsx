"use client";

import CardBox from "@/shared/components/CardBox";
import MetricStats from "@/shared/components/MetricStats";
import ModalBox from "@/shared/components/ModalBox";
import { formatDateIndo } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import {
  ArrowSquareOut,
  PencilSimple,
  ShoppingCartSimple,
} from "@phosphor-icons/react";
import { useState } from "react";
import { WishlistEntry } from "../wishlist/wishlist.types";
import ActionButton from "@/shared/components/ActionButton";

interface WishlistCardProps {
  item: WishlistEntry;
  onDetailClick?: (item: WishlistEntry) => void;
}

export default function WishlistCard({
  item,
  onDetailClick,
}: WishlistCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeStoreLink = item.storeLink || item.brand.storeLink;
  const formatedPrice = formatRupiah(item.estimatedPrice);

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

        {(activeStoreLink || item.createdAt) && (
          <div className="flex flex-col gap-3 mt-1">
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
      </CardBox>
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
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-base-200/60 p-3 rounded-xl">
            <span className="text-caption font-bold text-base-content/70">
              Manage Product Data
            </span>
            <div className="flex gap-2">
              <ActionButton
                icon={PencilSimple}
                color="warning"
                size={14}
                to={`/beauty/wishlist/${item.id}/edit`}
              />
              <ActionButton
                icon={ShoppingCartSimple}
                color="secondary"
                size={14}
                to={`/beauty/wishlist/${item.id}/purchase`}
              />
            </div>
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
        </div>
      </ModalBox>
    </>
  );
}
