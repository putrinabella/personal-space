"use client";

import DockNavbar from "@/shared/components/DockNavbar";
import React from "react";

// export default function DashboardShellLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="h-full w-full flex flex-col relative overflow-hidden">
//       <div className="flex-1 overflow-y-auto pt-6 px-4 md:px-8 pb-32 mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]">
//         <div>{children}</div>
//       </div>

//       <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
//         <div className="pointer-events-auto">
//           <DockNavbar />
//         </div>
//       </div>
//     </main>
//   );
// }
export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full flex flex-col relative overflow-hidden items-center">
      {/* Kontainer Konten Utama: Ubah dari 75% ke 90% agar area pudarnya lebih rendah/pendek */}
      <div className="flex-1 w-full max-w-7xl overflow-y-auto pt-6 px-4 md:px-8 pb-32 mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]">
        {children}
      </div>

      {/* Lapisan Gradient belakang dock: Ubah h-28 ke h-20 agar tidak terlalu tinggi */}
      <div className="absolute bottom-0 w-full h-20 bg-linear-to-t from-base-100/80 via-base-100/30 to-transparent pointer-events-none z-40" />

      {/* Kontainer Dock */}
      <div className="absolute bottom-6 w-full max-w-7xl px-4 md:px-8 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex justify-center w-full">
          <DockNavbar />
        </div>
      </div>
    </main>
  );
}
// export default function DashboardShellLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="h-full w-full flex flex-col relative overflow-hidden items-center">
//       {/* Kontainer Konten Utama */}
//       <div className="flex-1 w-full max-w-7xl overflow-y-auto pt-6 px-4 md:px-8 pb-32">
//         {children}
//       </div>

//       {/* Kontainer Dock */}
//       <div className="absolute bottom-6 w-full max-w-7xl px-4 md:px-8 z-50 flex justify-center pointer-events-none">
//         {/* Hapus w-full, gunakan flex justify-center pada pembungkus utama */}
//         <div className="pointer-events-auto flex justify-center w-full">
//           <DockNavbar />
//         </div>
//       </div>
//     </main>
//   );
// }
