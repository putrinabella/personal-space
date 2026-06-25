import { showAlert } from "@/components/Swal";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  meta?: {
    message?: string;
  };
  errors?: Record<string, string[]>;
}

export async function handleApiError(
  err: unknown,
  fallbackMessage = "Terjadi kesalahan yang tidak diketahui.",
) {
  let message = fallbackMessage;

  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiErrorResponse;

    if (data?.errors) {
      message = Object.values(data.errors).flat().join("\n");
    } else if (data?.meta?.message) {
      message = data.meta.message;
    } else if (data?.message) {
      message = data.message;
    } else if (err.message) {
      message = err.message;
    }
  } else if (err instanceof Error) {
    message = err.message;
  }

  if (typeof window !== "undefined") {
    await showAlert({
      title: "Gagal",
      text: message,
      icon: "error",
      confirmButtonText: "Mengerti",
      showConfirmButton: true,
    });
  } else {
    console.error("[API Error]:", message);
  }
}
