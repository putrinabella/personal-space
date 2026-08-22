"use client";

import DockNavbar from "@/shared/components/DockNavbar";
import React from "react";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex flex-col relative items-center">
      <div className="flex-1 w-full max-w-7xl pt-6 px-4 md:px-8 pb-36">
        {children}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex justify-center">
        <div className="w-full max-w-7xl h-24 bg-linear-to-t from-base-100 via-base-100/80 to-transparent px-4 md:px-8" />
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-7xl flex justify-center">
          <DockNavbar />
        </div>
      </div>
    </main>
  );
}
