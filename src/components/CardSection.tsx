"use client";

import React from "react";
import CardBox from "./CardBox";
import { DaisyColor, bgMap, isDaisyColor } from "@/utils/color";

interface CardSectionProps {
  children?: React.ReactNode;
  title: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  headerColor?: DaisyColor | string;
  color?: DaisyColor | string;
  rounded?: "full" | "box" | "3xl" | "2xl" | "xl" | "none";
  shadowSize?: "sm" | "md" | "lg";
  className?: string;
  align?: "left" | "center";
  headerClassName?: string;
  variant?: "heading" | "normal";
}

export default function CardSection({
  children,
  title,
  icon: IconComponent,
  headerColor = "base-100",
  color = "base-100",
  rounded = "2xl",
  shadowSize = "md",
  className = "",
  align = "left",
  headerClassName = "",
  variant = "heading", // ✨ Default tetap menggunakan style heading yang megah
}: CardSectionProps) {
  const isCenter = align === "center";
  const isHeading = variant === "heading";

  // 🎨 Menentukan kelas CSS & Ukuran Ikon berdasarkan varian ukuran yang Ratu pilih
  const titleClass = isHeading ? "heading-h2" : "text-body font-bold";
  const iconSize = isHeading ? 20 : 16;
  const iconClass = isHeading ? "w-5 h-5" : "w-4 h-4";

  const headerBgClass = isDaisyColor(headerColor)
    ? bgMap[headerColor]
    : headerColor;

  return (
    <CardBox
      color={color}
      rounded={rounded}
      shadowSize={shadowSize}
      className={`p-0 overflow-hidden flex flex-col ${className}`}
    >
      {/* 🏷️ HEADER SECTION */}
      <div
        className={`w-full px-6 py-4 border-b-4 border-neutral flex items-center gap-3
          ${isCenter ? "justify-center text-center" : "justify-start"}
          ${headerBgClass} ${headerClassName}`}
      >
        {!isCenter && IconComponent && (
          <IconComponent
            className={`${iconClass} text-current stroke-[2.5]`}
            size={iconSize}
          />
        )}

        <h2
          className={`${titleClass} text-current select-none flex items-center gap-2`}
        >
          {isCenter && IconComponent && (
            <IconComponent
              className={`${iconClass} text-current stroke-[2.5]`}
              size={iconSize}
            />
          )}
          {title}
        </h2>
      </div>

      {/* 📝 CONTENT AREA */}
      <div className={`p-6 flex-1 w-full ${isCenter ? "text-center" : ""}`}>
        {children}
      </div>
    </CardBox>
  );
}
