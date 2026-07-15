"use client";

import * as PhosphorIcons from "@phosphor-icons/react";

interface IconRendererProps {
  name: string; // Nama icon dalam string (contoh: "Coffee")
  size?: number;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export default function IconRenderer({
  name,
  size = 20,
  className = "",
  weight = "bold",
}: IconRendererProps) {
  const IconComponent = (PhosphorIcons as any)[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} weight={weight} />;
}
