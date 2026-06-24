// import type { Metadata } from "next";
// import { Fredoka, Playpen_Sans } from "next/font/google";
// import "./globals.css";

// const headerFont = Fredoka({
//   subsets: ["latin"],
//   weight: ["600", "700"],
//   variable: "--font-header",
// });

// const bodyFont = Playpen_Sans({
//   subsets: ["latin"],
//   weight: ["400", "600"],
//   variable: "--font-body",
// });

// export const metadata: Metadata = {
//   title: "Eunoia Foodie Diary 🎀",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // Mengaktifkan kedua font sekaligus di tag html
//     <html lang="en" className={`${headerFont.variable} ${bodyFont.variable}`}>
//       <body className="bg-base-100 text-base-content antialiased">
//         {children}
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Fredoka, Playpen_Sans } from "next/font/google";
import "./globals.css";

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
      {/* 🎨 Menyuntikkan bg-cute-grid secara global untuk seluruh halaman web */}
      <body className="bg-base-100 bg-cute-grid text-base-content antialiased min-h-screen pb-24">
        {children}
      </body>
    </html>
  );
}
