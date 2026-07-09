import { Fredoka, Quicksand, Inter } from "next/font/google";
import type { Metadata } from "next";
import DockNavbar from "@/shared/components/DockNavbar";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const headerFont = Fredoka({
  subsets: ["latin"],
  variable: "--font-header",
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-body", // Untuk teks utama
});

const captionFont = Inter({
  subsets: ["latin"],
  variable: "--font-caption", // Untuk data kecil/caption
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
    <html
      lang="en"
      className={`${headerFont.variable} ${bodyFont.variable} ${captionFont.variable}`}
    >
      <body className="font-body bg-base-100 bg-cute-grid text-base-content antialiased h-screen overflow-hidden flex flex-col relative">
        <QueryProvider>
          <div className="flex-1 overflow-y-auto w-full pb-36 mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]">
            {children}
          </div>
          <DockNavbar />
        </QueryProvider>
      </body>
    </html>
  );
}
