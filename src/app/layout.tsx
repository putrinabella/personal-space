import { Fredoka, Quicksand, Inter } from "next/font/google";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const headerFont = Fredoka({
  subsets: ["latin"],
  variable: "--font-header",
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
});

const captionFont = Inter({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
  title: "E U N O I A",
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
      <body className="font-body bg-base-100 bg-cute-grid text-base-content antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <div className="flex-1 w-full h-full">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
