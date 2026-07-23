"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CardBox from "@/shared/components/CardBox";
import FormInput from "@/shared/components/FormInput";
import { WarningCircle, CircleNotch } from "@phosphor-icons/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <CardBox
      className="w-2xl relative flex flex-col mx-8 overflow-visible"
      rounded="2xl"
    >
      <div className="flex flex-col items-center text-center gap-1 px-8 pt-8 pb-6">
        <h1 className="font-serif italic text-4xl font-black tracking-tight text-base-content mt-1">
          Eounia
        </h1>
        <p className="text-sm text-base-content/60 font-medium">
          One Home for Everything That Matters
        </p>
      </div>

      <div className="relative">
        <div className="border-t-2 border-dashed border-base-300 mx-6" />
      </div>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 px-8 pt-6 pb-8"
      >
        {error && (
          <div className="flex items-center gap-2 p-3 bg-error/10 text-error text-sm font-bold rounded-xl">
            <WarningCircle weight="fill" className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <FormInput
          label="Email"
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder="your@email.com"
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(val) => setPassword(val)}
          placeholder="••••••••"
          required
        />

        <CardBox
          className="mt-2 h-12 flex items-center justify-center gap-2 font-bold"
          rounded="xl"
          color="accent"
          pressable
          onClick={() => handleLogin()}
        >
          {loading ? (
            <>
              <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
              Checking credentials...
            </>
          ) : (
            "Login"
          )}
        </CardBox>
      </form>
    </CardBox>
  );
}
