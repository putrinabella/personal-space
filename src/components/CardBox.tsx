"use client";

import React from "react";
import Link from "next/link";
import { bgMap, isDaisyColor, DaisyColor } from "@/utils/color";

interface CardBoxProps {
  children: React.ReactNode;
  color?: DaisyColor | string; // Bisa "primary" atau class Tailwind murni seperti "bg-[#FFFDF6]"
  rounded?: "full" | "box" | "3xl" | "2xl" | "xl" | "none"; // Variasi tingkat border-radius
  shadowSize?: "sm" | "md" | "lg"; // Ketebalan bayangan pop cokelat tebal
  href?: string; // Jika diisi, otomatis dirender menjadi Next.js <Link>
  onClick?: () => void; // Jika diisi tanpa href, otomatis bertindak sebagai <button>
  className?: string; // Untuk selipan layout tambahan (seperti flex, p-6, grid, dll)
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
  // 🎨 1. Tentukan skema warna latar belakang
  const bgClass = isDaisyColor(color) ? bgMap[color] : color;

  // 📐 2. Tentukan ukuran melengkung border radius (bisa dibaca oleh utility DaisyUI)
  const roundedClassMap = {
    full: "rounded-full",
    box: "rounded-box", // Mengikuti variabel --radius-box global
    "3xl": "rounded-[32px]",
    "2xl": "rounded-3xl",
    xl: "rounded-2xl",
    none: "rounded-none",
  };
  const roundedClass = roundedClassMap[rounded];

  // 🧱 3. Tentukan ketebalan bayangan 3D pop cokelat tebal (#4A3E3D)
  const shadowClassMap = {
    sm: "shadow-[4px_4px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
    md: "shadow-[6px_6px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
    lg: "shadow-[8px_8px_0px_rgba(74,62,61,1)] active:shadow-none active:translate-y-1",
  };
  const shadowClass = shadowClassMap[shadowSize];

  // ⚙️ 4. Tentukan tipe komponen wrapper secara dinamis (Polymorphic)
  const isLink = Boolean(href);
  const isButton = Boolean(onClick) && !isLink;

  const baseStyles = `
    border-4 border-neutral
    transition-all duration-200 ease-out
    ${bgClass} ${roundedClass} ${shadowClass} ${className}
  `;

  // Render jika bertindak sebagai Link antar halaman
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

  // Render jika bertindak sebagai Button aksi klik
  if (isButton) {
    return (
      <button onClick={onClick} className={baseStyles}>
        {children}
      </button>
    );
  }

  // Render sebagai block Div struktural biasa
  return <div className={baseStyles}>{children}</div>;
}
