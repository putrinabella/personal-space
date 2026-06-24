"use client";

import DockNavbar from "@/components/DockNavbar";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Konten halaman (/food, /finance, dll) akan masuk ke {children} */}
      <main className="min-h-[70vh] transition-all duration-300">
        {children}
      </main>

      {/* Navigasi kapsul bawah melayang global */}
      <DockNavbar />
    </div>
  );
}
