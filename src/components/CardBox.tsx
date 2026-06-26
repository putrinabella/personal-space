"use client";

import React from "react";
import Link from "next/link";
import { bgMap, isDaisyColor, DaisyColor } from "@/utils/color";

interface CardBoxProps {
  children: React.ReactNode;
  color?: DaisyColor | string;
  rounded?: "full" | "box" | "3xl" | "2xl" | "xl" | "lg" | "md" | "none";
  shadowSize?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  pressable?: boolean;
}

export default function CardBox({
  children,
  color = "base-100",
  rounded = "2xl",
  shadowSize = "md",
  href,
  onClick,
  className = "",
  pressable,
}: CardBoxProps) {
  const bgClass = isDaisyColor(color) ? bgMap[color] : color;

  const roundedClassMap = {
    full: "rounded-full",
    box: "rounded-box",
    "3xl": "rounded-[32px]",
    "2xl": "rounded-3xl",
    xl: "rounded-2xl",
    lg: "rounded-lg",
    md: "rounded-md",
    none: "rounded-none",
  };
  const roundedClass = roundedClassMap[rounded];

  const shadowClassMap = {
    sm: "shadow-[4px_4px_0px_rgba(74,62,61,1)]",
    md: "shadow-[6px_6px_0px_rgba(74,62,61,1)]",
    lg: "shadow-[8px_8px_0px_rgba(74,62,61,1)]",
  };
  const shadowClass = shadowClassMap[shadowSize];

  const isLink = Boolean(href);
  const isButton = Boolean(onClick) && !isLink;

  // HAPUS "transition-all duration-200 ease-out"
  const pressableStyles = pressable
    ? "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
    : "";

  // 2. Gabungkan ke baseStyles
  const baseStyles = `
    border-4 border-neutral
    ${bgClass} ${roundedClass} ${shadowClass}
    ${pressableStyles}
    ${className}
  `;

  if (isLink && href) {
    return (
      <Link href={href} className={`${baseStyles} block`}>
        {children}
      </Link>
    );
  }

  if (isButton) {
    // Tambahkan cursor-pointer jika tombol, atau hapus jika ingin benar-benar statis
    return (
      <button onClick={onClick} className={`${baseStyles} cursor-pointer`}>
        {children}
      </button>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}
