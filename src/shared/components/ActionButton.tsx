"use client";

import React, { ElementType } from "react";
import Link from "next/link";
import { DaisyColor, getButtonColorClass } from "@/utils/color";
import IconRenderer from "./IconRenderer";

type ActionButtonProps = {
  to?: string;
  href?: string;
  icon?: ElementType | string;
  label?: string;
  color?: DaisyColor;
  size?: number;
  tooltip?: string;
  isProgress?: boolean;
  loading?: boolean; // 🆕 Status loading
  disabled?: boolean; // 🆕 Status disabled manual
  progress?: number;
  loadingLabel?: string;
  className?: string;
  onClick?: () => void | Promise<void>;
};

const ActionButton = ({
  to,
  href,
  icon,
  label,
  color = "primary",
  size = 16,
  tooltip,
  isProgress = false,
  loading = false,
  disabled = false, // 🆕 Destructure disabled
  progress = 0,
  loadingLabel,
  className = "",
  onClick,
}: ActionButtonProps) => {
  const buttonStyle = getButtonColorClass(color);
  const isDisabled = loading || disabled;

  const baseClasses = `
    relative overflow-hidden flex items-center justify-center gap-2
    px-3 py-2 rounded-lg transition-all min-w-0
    ${isDisabled ? "opacity-60 cursor-not-allowed grayscale-[0.5]" : "hover:scale-105"}
    ${buttonStyle} text-primary-content
    ${color === "neutral" ? "border border-primary" : ""}
    ${className}
  `;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string")
      return <IconRenderer name={icon} size={size} />;

    const IconComponent = icon as ElementType;
    return <IconComponent size={size} weight="bold" />;
  };

  const content = (
    <span className="relative z-40 flex items-center gap-2 text-sm font-medium min-w-0">
      {loading ? (
        isProgress ? (
          `${loadingLabel || "Processing"} ${progress}%`
        ) : (
          <span className="loading loading-spinner loading-xs" />
        )
      ) : (
        <>
          {icon && (
            <span className="shrink-0 flex items-center">{renderIcon()}</span>
          )}
          {label && <span className="truncate max-w-30">{label}</span>}
        </>
      )}
    </span>
  );

  const progressOverlay =
    loading && isProgress ? (
      <div className="absolute inset-0 bg-primary/20 z-0">
        <div
          className="h-full bg-primary z-30 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    ) : null;

  const tooltipWrapper = (child: React.ReactNode) => (
    <div className={tooltip ? "tooltip tooltip-top" : ""} data-tip={tooltip}>
      {child}
    </div>
  );
  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  if (href && !isDisabled) {
    return tooltipWrapper(
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={handleClick}
      >
        {content}
      </a>,
    );
  }

  if (to && !isDisabled) {
    return tooltipWrapper(
      <Link href={to} className={baseClasses}>
        {content}
      </Link>,
    );
  }

  return tooltipWrapper(
    <button onClick={handleClick} disabled={isDisabled} className={baseClasses}>
      {progressOverlay}
      {content}
    </button>,
  );
};

export default ActionButton;
