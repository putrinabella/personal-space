"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Wallet,
  FilmStrip,
  Hamburger,
  GearSix,
  MapPinArea,
  ForkKnife,
  ChartPieSlice,
} from "@phosphor-icons/react";
import CardBox from "./CardBox";

export default function DockNavbar() {
  const pathname = usePathname();

  // 1. Definisikan sub-menu untuk setiap modul
  const subMenus: Record<string, any[]> = {
    "/food": [
      { path: "/food/dashboard", label: "Food", Icon: Hamburger },
      { path: "/food/restaurant", label: "Places", Icon: MapPinArea },
      { path: "/food/settings", label: "Config", Icon: GearSix },
    ],
    "/finance": [
      { path: "/finance", label: "Dashboard", Icon: ChartPieSlice },
      { path: "/finance/history", label: "History", Icon: Wallet },
    ],
    // Tambahkan untuk /movie dsb
  };

  // 2. Tentukan menu mana yang aktif
  const baseRoute = "/" + pathname.split("/")[1];
  const activeSubMenus = subMenus[baseRoute] || [
    { path: "/", label: "Home", Icon: House },
    { path: "/food/dashboard", label: "Food", Icon: Hamburger },
    { path: "/finance", label: "Finance", Icon: Wallet },
    { path: "/movie", label: "Movie", Icon: FilmStrip },
  ];
  // const pathname = usePathname();

  // const menus = [
  //   {
  //     path: "/",
  //     label: "Home",
  //     Icon: House,
  //     isRoot: true,
  //   },
  //   {
  //     path: "/food",
  //     label: "Food",
  //     Icon: Hamburger,
  //   },
  //   {
  //     path: "/finance",
  //     label: "Finance",
  //     Icon: Wallet,
  //   },
  //   {
  //     path: "/movie",
  //     label: "Movie",
  //     Icon: FilmStrip,
  //   },
  // ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-max pointer-events-none">
      <div className="pointer-events-auto">
        <CardBox
          color="base-100"
          rounded="full"
          className="px-6 py-3 flex items-center justify-center gap-6"
        >
          {baseRoute !== "/" && (
            <Link
              href="/"
              className="px-4 py-3 rounded-full border-2 transition-all duration-200 ease-out flex items-center justify-center gap-2 bg-transparent border-transparent text-neutral/70 hover:text-neutral hover:scale-105"
            >
              <House size={20} />{" "}
              <span className="hidden md:block font-bold text-sm tracking-wide">
                Home
              </span>
            </Link>
          )}
          {activeSubMenus.map((menu: any) => {
            const isActive = menu.isRoot
              ? pathname === menu.path
              : pathname.startsWith(menu.path);

            const IconComponent = menu.Icon;
            const isPhosphor = menu.Icon !== Hamburger;
            return (
              <Link
                key={menu.path}
                href={menu.path}
                title={menu.label}
                className={`px-4 py-3 rounded-full border-2 transition-all duration-200 ease-out flex items-center justify-center gap-2
      ${
        isActive
          ? "bg-primary border-neutral scale-105 shadow-[2px_2px_0px_rgba(74,62,61,1)] text-neutral"
          : "bg-transparent border-transparent text-neutral/70 hover:text-neutral hover:scale-105"
      }`}
              >
                {/* Ikon */}
                {isPhosphor ? (
                  <IconComponent
                    size={24}
                    weight={isActive ? "fill" : "bold"}
                  />
                ) : (
                  <IconComponent size={24} strokeWidth={isActive ? 3 : 2} />
                )}

                {/* Teks Label - Hanya muncul di Desktop (md ke atas) */}
                <span className="hidden md:block font-bold text-sm tracking-wide">
                  {menu.label}
                </span>
              </Link>
            );
          })}
        </CardBox>
      </div>
    </div>
  );
}
