"use client";

import React from "react";
import CardBox from "./CardBox";
import { DaisyColor } from "@/utils/color";

interface CardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  color?: DaisyColor | string;
  rounded?: "full" | "box" | "3xl" | "2xl" | "xl" | "none";
  shadowSize?: "sm" | "md" | "lg";
  className?: string;
}

export default function CardHeader({
  title,
  description,
  icon: IconComponent,
  color = "primary",
  rounded = "2xl",
  shadowSize = "md",
  className = "",
}: CardHeaderProps) {
  return (
    <CardBox
      color={color}
      rounded={rounded}
      shadowSize={shadowSize}
      className={`p-4 md:p-6 flex items-center gap-5 ${className}`}
    >
      {IconComponent && (
        <CardBox
          color="primary"
          rounded="xl"
          shadowSize="sm"
          className="p-3 border-3 flex items-center justify-center shrink-0 select-none active:translate-y-0"
        >
          <IconComponent className="stroke-[2.5]" size={28} />
        </CardBox>
      )}

      <div className="flex flex-col justify-center text-left">
        <h1 className="heading-h1 text-current uppercase tracking-tight select-none flex items-center gap-2">
          {title}
        </h1>

        {description && (
          <p className="text-xs md:text-sm font-bold text-current/80 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </CardBox>
  );
}
