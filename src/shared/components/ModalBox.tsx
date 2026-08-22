"use client";

import React, { useEffect } from "react";
import { X } from "@phosphor-icons/react";
import CardBox from "./CardBox";
import { DaisyColor } from "@/utils/color";

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  cardColor?: DaisyColor | string;
  className?: string;
}

export default function ModalBox({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
  cardColor = "base-100",
  className = "",
}: ModalBoxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthMap[maxWidth]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CardBox
          className={`max-h-[70vh] p-5 flex flex-col border-4 ${className}`}
          rounded="2xl"
          color={cardColor}
        >
          {(title || subtitle) && (
            <div className="flex justify-between items-start mb-3 gap-4 shrink-0">
              <div>
                {subtitle && (
                  <span className="text-caption font-bold uppercase tracking-widest text-base-content block mb-1">
                    {subtitle}
                  </span>
                )}
                {title && (
                  <h3 className="heading-h3 font-black text-base-content">
                    {title}
                  </h3>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 border-2 border-black text-base-content hover:bg-base-300 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 overflow-y-auto pr-1">
            {children}
          </div>
        </CardBox>
      </div>
    </div>
  );
}
