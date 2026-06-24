"use client";

import React from "react";
import Link from "next/link";
import { bgMap, isDaisyColor, DaisyColor } from "@/utils/color";

interface CardBoxProps {
  children: React.ReactNode;
  color?: DaisyColor | string;
  rounded?: "full" | "box" | "3xl" | "2xl" | "xl" | "none";
  shadowSize?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function CardBox({
  children,
  color = "base-100",
  rounded = "2xl",
  shadowSize = "md",
  href,
  onClick,
  className = "",
}: CardBoxProps) {
  const bgClass = isDaisyColor(color) ? bgMap[color] : color;

  const roundedClassMap = {
    full: "rounded-full",
    box: "rounded-box",
    "3xl": "rounded-[32px]",
    "2xl": "rounded-3xl",
    xl: "rounded-2xl",
    none: "rounded-none",
  };
  const roundedClass = roundedClassMap[rounded];

  const shadowClassMap = {
    sm: "shadow-[4px_4px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
    md: "shadow-[6px_6px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
    lg: "shadow-[8px_8px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
  };
  const shadowClass = shadowClassMap[shadowSize];

  const isLink = Boolean(href);
  const isButton = Boolean(onClick) && !isLink;

  const baseStyles = `
    border-4 border-neutral
    transition-all duration-200 ease-out
    ${bgClass} ${roundedClass} ${shadowClass} ${className}
  `;

  if (isLink && href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} block hover:-translate-y-0.5`}
      >
        {children}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button onClick={onClick} className={baseStyles}>
        {children}
      </button>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}
