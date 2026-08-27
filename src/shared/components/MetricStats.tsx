"use client";

import React from "react";

export interface MetricItem {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

interface MetricStatsProps {
  items: MetricItem[];
  className?: string;
}

export default function MetricStats({
  items,
  className = "",
}: MetricStatsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`grid grid-flow-col auto-cols-fr w-full ${className}`}>
      {items.map((item, index) => {
        const hasBorder = index > 0;

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-2 ${
              hasBorder ? "border-l border-base-300" : ""
            }`}
          >
            <span className="text-caption uppercase tracking-widest text-base-content/70">
              {item.label}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {item.icon}
              <span className="text-data text-base-content font-bold">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
