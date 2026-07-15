"use client";

import DockNavbar from "@/shared/components/DockNavbar";
import React from "react";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full flex flex-col relative overflow-hidden">
      {/*
         1. pb-32: Memberi ruang agar konten terakhir tidak tertutup navbar.
         2. mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]:
            Memberikan efek fade-out/blur halus tepat di atas navbar.
      */}
      <div className="flex-1 overflow-y-auto pt-6 px-4 md:px-8 pb-32 mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]">
        <div>{children}</div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <DockNavbar />
        </div>
      </div>
    </main>
  );
}
