"use client";

import React from "react";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
      1. Kita buang `h-screen justify-between overflow-hidden relative` lama yang mengganggu.
      2. Kita berikan `pb-32` (Padding Bottom) di sini agar ketika konten dashboard Ratu sangat panjang,
         baris paling bawah bisa di-scroll naik melewati batas atas DockNavbar secara natural.
    */
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-32 transition-all duration-300">
      {children}
    </main>
  );
}
