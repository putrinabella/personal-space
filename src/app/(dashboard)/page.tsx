"use client";

import { createClient } from "@/lib/supabase/client";
import CardBox from "@/shared/components/CardBox";
import { useLogout } from "@/shared/hooks/use-logout";
import { SignOut, Sparkle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const supabase = createClient();
  const { logout } = useLogout();

  const [user, setUser] = useState<{
    name: string | null;
    email: string | null;
  } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          name: data.user.user_metadata.display_name ?? null,
          email: data.user.email ?? null,
        });
      }
    });
  }, [supabase]);
  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] py-12 px-4 gap-8">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-base-content">
          Eunoia
        </h1>
        <p className="text-body font-medium italic mt-3 text-base-content/80">
          &quot;One Home for Everything That Matters.&quot;
        </p>
      </div>

      <CardBox
        className="relative flex flex-col w-full max-w-sm overflow-visible"
        rounded="2xl"
      >
        <div className="flex items-center gap-4 px-6 pt-6 pb-5">
          <div className="h-12 w-12 shrink-0 rounded-full bg-accent/15 text-accent flex items-center justify-center font-black text-lg">
            <Sparkle size={24} weight="fill" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold tracking-widest uppercase text-base-content/40">
              Good to See You
            </span>
            <span className="font-bold text-base-content truncate">
              {user ? (
                (user.name ?? user.email)
              ) : (
                <span className="inline-block h-4 w-32 rounded bg-base-300 animate-pulse" />
              )}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="border-t-2 border-dashed border-base-300 mx-6" />
        </div>

        <CardBox
          className="m-4 h-12 flex items-center justify-center gap-2 font-bold"
          rounded="xl"
          color="accent"
          pressable
          onClick={logout}
        >
          <SignOut size={20} />
          Logout
        </CardBox>
      </CardBox>
    </div>
  );
}
