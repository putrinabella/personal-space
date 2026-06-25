import type { Metadata } from "next";
import { Fredoka, Playpen_Sans } from "next/font/google";
import "./globals.css";
import DockNavbar from "@/components/DockNavbar";
// 1. Impor Provider yang baru Anda buat
import QueryProvider from "@/providers/QueryProvider";

const headerFont = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-header",
});

const bodyFont = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Eunoia 🎀",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headerFont.variable} ${bodyFont.variable}`}>
      <body className="bg-base-100 bg-cute-grid text-base-content antialiased h-screen overflow-hidden flex flex-col relative">
        {/* 2. Bungkus children dengan QueryProvider */}
        <QueryProvider>
          <div className="flex-1 overflow-y-auto w-full pb-36 mask-[linear-gradient(to_bottom,black_80%,transparent_98%)]">
            {children}
          </div>

          <DockNavbar />
        </QueryProvider>
      </body>
    </html>
  );
}
