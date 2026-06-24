"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Wallet, FilmStrip } from "@phosphor-icons/react";
import { Hamburger } from "lucide-react";
import CardBox from "./CardBox";

export default function DockNavbar() {
  const pathname = usePathname();

  const menus = [
    {
      path: "/",
      label: "Home",
      Icon: House,
      isRoot: true,
    },
    {
      path: "/food",
      label: "Food",
      Icon: Hamburger,
    },
    {
      path: "/finance",
      label: "Finance",
      Icon: Wallet,
    },
    {
      path: "/movie",
      label: "Movie",
      Icon: FilmStrip,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-max">
      <CardBox
        color="base-100"
        rounded="full"
        href="/finance"
        className="px-6 py-3 flex items-center justify-center gap-6"
      >
        {menus.map((menu) => {
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
              className={`p-3 rounded-full border-2 transition-all duration-200 ease-out flex items-center justify-center
                ${
                  isActive
                    ? "bg-primary border-neutral scale-110 shadow-[2px_2px_0px_rgba(74,62,61,1)] text-neutral"
                    : "bg-transparent border-transparent text-neutral/70 hover:text-neutral hover:scale-105"
                }`}
            >
              {isPhosphor ? (
                <IconComponent size={28} weight={isActive ? "fill" : "bold"} />
              ) : (
                <IconComponent size={28} strokeWidth={isActive ? 3 : 2} />
              )}
            </Link>
          );
        })}
      </CardBox>
    </div>
  );
}
