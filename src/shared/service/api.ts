// Tambahkan definisi tipe ini di atas fungsi apiFetch kamu jika belum ada
type ExtendedRequestInit = RequestInit & {
  next?: any;
  urlType?: "base" | "promotion"; // <-- Tambahkan baris ini!
};

const BASE_URL = process.env.API_BASE_URL!;
const PROMOTION_URL = process.env.API_PROMOTION_URL; // <-- Ambil juga URL Promosinya

export async function apiFetch<T>(
  path: string,
  options?: ExtendedRequestInit, // <-- Ganti tipe data options-nya di sini
): Promise<T> {
  // Tentukan base URL secara dinamis
  const selectedBaseUrl =
    options?.urlType === "promotion" ? PROMOTION_URL || BASE_URL : BASE_URL;

  // Gunakan selectedBaseUrl di bawah ini
  const res = await fetch(`${selectedBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.meta?.message || "API Error");
  }

  return json;
}
// const BASE_URL = process.env.API_BASE_URL!;

// export async function apiFetch<T>(
//   path: string,
//   options?: RequestInit & { next?: any },
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options?.headers || {}),
//     },
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json?.meta?.message || "API Error");
//   }

//   return json;
// }
