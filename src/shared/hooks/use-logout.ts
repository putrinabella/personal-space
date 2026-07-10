"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { showAlert } from "@/shared/components/Swal";

export function useLogout() {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    const result = await showAlert({
      title: "Confirm Logout",
      text: "Are you sure you want to sign out of your account?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Sign Out",
      cancelButtonText: "Cancel",
    });

    if (result) {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  return { logout };
}
