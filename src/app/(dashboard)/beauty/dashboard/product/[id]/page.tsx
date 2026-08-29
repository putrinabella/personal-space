"use client";

import { use } from "react";
import {
  Package,
  Star,
  FlowerLotusIcon,
  ShieldWarning,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import DataSection from "@/shared/components/DataSection";
import { useProductDetail } from "@/features/beauty/product/hooks/useProductDetail";
import StockAlertBadge from "@/features/beauty/components/StockAlertBadge";
import MetricStats from "@/shared/components/MetricStats";
import UnitCard from "@/features/beauty/components/UnitCard";
import { UNIT_STATUS_CONFIG } from "@/features/beauty/constants/status-option";
import ActionButton from "@/shared/components/ActionButton";
import { useProductDelete } from "@/features/beauty/product/hooks/useProductDelete";
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, loading, error } = useProductDetail(id);
  const { handleDelete } = useProductDelete();

  if (loading || error || !product) {
    return (
      <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto p-4">
        <DataSection loading={loading} error={error} data={product} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12 px-2 sm:px-0">
      <CardHeader
        title={product.name}
        icon={FlowerLotusIcon}
        color="accent"
        description={
          <span className="flex flex-row gap-2 uppercase text-caption ">
            {product.brand.storeLink ? (
              <a
                href={product.brand.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1"
                title="Visit Store"
              >
                {product.brand.name}
              </a>
            ) : (
              <span>{product.brand.name}</span>
            )}

            {product.brand?.name && product.category?.name && <span>•</span>}

            {product.category?.name && <span>{product.category.name}</span>}
          </span>
        }
      />

      <CardBox className="p-4 md:p-6 flex flex-col gap-4" rounded="2xl">
        <StockAlertBadge
          quantity={product.quantity}
          minimumStock={product.minStock}
        />
        <MetricStats
          items={[
            {
              label: "Rating",
              value: product.rating || "-",
              icon: <Star size={14} weight="fill" className="text-warning" />,
            },
            {
              label: "Stock",
              value: product.quantity,
              icon: (
                <Package
                  size={14}
                  weight="bold"
                  className="text-base-content/80"
                />
              ),
            },
            {
              label: "Min Stock",
              value: product.minStock,
              icon: (
                <ShieldWarning
                  size={14}
                  weight="bold"
                  className="text-error/80"
                />
              ),
            },
          ]}
          className="bg-base-200/60 rounded-xl p-2"
        />{" "}
        {product.notes && (
          <div className="p-2 text-base-content bg-base-200/60 rounded-xl text-caption border-l-4 border-primary">
            &quot;{product.notes}&quot;
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-base-200 items-start">
          <div className="flex flex-col gap-2 md:col-span-2">
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

          <div className="flex items-center justify-end gap-2 md:col-span-1 h-full pt-1">
            <ActionButton
              icon={Trash}
              color="error"
              size={14}
              onClick={() => handleDelete(product.id)}
              tooltip="Delete"
            />
            <ActionButton
              icon={PencilSimple}
              color="warning"
              size={14}
              to={`/beauty/dashboard/product/${product.id}/edit`}
              tooltip="Edit"
            />{" "}
          </div>
        </div>
      </CardBox>

      <div className="flex flex-col gap-4 ">
        <div className="flex flex-row justify-between heading-h4 uppercase tracking-tight px-1">
          <h4>Associated Units </h4>
          <span className="bg-primary rounded-lg px-2">
            Total: {product.units?.length || 0}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.units && product.units.length > 0 ? (
            product.units.map((unit: any, idx: number) => (
              <UnitCard
                key={unit.id || idx}
                unit={unit}
                idx={idx}
                statusConfig={UNIT_STATUS_CONFIG}
              />
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
