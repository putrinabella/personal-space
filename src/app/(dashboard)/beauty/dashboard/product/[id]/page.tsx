"use client";

import { use } from "react";
import {
  Package,
  Tag,
  Storefront,
  Sparkle,
  PencilSimple,
  Star,
  FlowerLotusIcon,
} from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import DataSection from "@/shared/components/DataSection";
import { useProductDetail } from "@/features/beauty/product/hooks/useProductDetail";
import { formatDateIndo } from "@/utils/dateFormatter";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, loading, error } = useProductDetail(id);

  if (loading || error || !product) {
    return (
      <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto p-4">
        <DataSection loading={loading} error={error} data={product} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12 px-2 sm:px-0">
      <CardHeader title={product.name} icon={FlowerLotusIcon} color="accent" />

      <CardBox className="p-4 md:p-6 flex flex-col gap-4" rounded="2xl">
        {/* Total Units Box */}
        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl">
          <div className="flex flex-col">
            <span className="text-caption font-bold uppercase tracking-widest">
              Total Units
            </span>
            <span className="text-caption text-base-content/60">
              Available in inventory
            </span>
          </div>
          <span className="text-2xl md:text-3xl font-extrabold text-primary">
            {product.quantity}
          </span>
        </div>

        {/* Edit Button */}
        <CardBox
          className="px-4 py-2 flex items-center gap-2 text-body font-bold shadow-sm"
          rounded="xl"
          color="accent"
          href={`/beauty/dashboard/edit/${product.id}`}
          pressable
        >
          <PencilSimple weight="bold" size={18} />
          <span>Edit Product</span>
        </CardBox>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <InfoRow label="Brand" value={product.brand?.name} icon={Tag} />
          <InfoRow
            label="Category"
            value={product.category?.name}
            icon={Sparkle}
          />
          <InfoRow
            label="Store"
            value={product.store?.name}
            icon={Storefront}
          />
          <InfoRow
            label="Min Stock"
            value={`${product.minStock} Units`}
            icon={Package}
          />
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2 pt-2 border-t border-base-200">
          <span className="text-caption font-bold uppercase tracking-wider text-base-content/60">
            Rating:
          </span>
          <div className="flex items-center gap-1 text-warning">
            {Array.from({ length: product.rating || 0 }).map((_, i) => (
              <Star key={i} weight="fill" size={16} />
            ))}
            {(!product.rating || product.rating === 0) && (
              <span className="text-caption text-base-content/40 italic">
                No rating
              </span>
            )}
          </div>
        </div>

        {/* Skin Concerns Section */}
        <div className="flex flex-col gap-2 pt-2 border-t border-base-200">
          <span className="text-caption font-bold text-base-content/60 uppercase tracking-wider">
            Skin Concerns
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.concerns && product.concerns.length > 0 ? (
              product.concerns.map((concern: any) => (
                <span
                  key={concern.id}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-caption font-bold"
                >
                  {concern.name}
                </span>
              ))
            ) : (
              <span className="text-caption text-base-content/40 italic">
                No concerns listed
              </span>
            )}
          </div>
        </div>
      </CardBox>

      {/* Associated Units Section */}
      <div className="flex flex-col gap-4">
        <h2 className="heading-h2 uppercase tracking-tight px-1">
          Associated Units ({product.units?.length || 0})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.units && product.units.length > 0 ? (
            product.units.map((unit: any) => (
              <CardBox
                key={unit.id}
                className="p-4 flex flex-col gap-3"
                rounded="2xl"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-md text-caption font-extrabold uppercase tracking-wider ${
                      unit.status === "active"
                        ? "bg-success/20 text-success"
                        : unit.status === "backup"
                          ? "bg-info/20 text-info"
                          : unit.status === "finished"
                            ? "bg-neutral text-neutral-content"
                            : "bg-error/20 text-error"
                    }`}
                  >
                    {unit.status}
                  </span>
                  <span className="text-body font-bold text-primary">
                    Rp {Number(unit.price || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col gap-1 text-caption text-base-content/70">
                  <div className="flex justify-between">
                    <span>Purchase Date:</span>
                    <span className="font-semibold text-data">
                      {formatDateIndo(unit.purchaseDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry Date:</span>
                    <span className="font-semibold text-data">
                      {formatDateIndo(unit.expiryDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>PAO Months:</span>
                    <span className="font-semibold text-data">
                      {unit.paoMonths ? `${unit.paoMonths} Months` : "-"}
                    </span>
                  </div>
                </div>
              </CardBox>
            ))
          ) : (
            <CardBox
              className="p-8 text-center sm:col-span-2 lg:col-span-3"
              rounded="2xl"
            >
              <p className="text-body text-base-content/50">
                No units found for this product.
              </p>
            </CardBox>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen Pembantu Baris Info
function InfoRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-base-200 flex items-center justify-center text-base-content/70 shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-caption font-bold text-base-content/50 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-body font-bold text-base-content">
          {value || "-"}
        </span>
      </div>
    </div>
  );
}
