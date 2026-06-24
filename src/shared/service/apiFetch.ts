// Sesuai kepatuhan TypeScript, gunakan tipe Next resmi daripada 'any' 🚀
type ExtendedRequestInit = RequestInit & {
  next?: NextFetchRequestConfig;
};

// Ambil URL domain sendiri atau gunakan relative path secara aman
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export async function apiFetch<T>(
  path: string,
  options?: ExtendedRequestInit,
): Promise<T> {
  // Langsung tembak ke internal API tanpa diskriminasi urlType lama
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const json = await res.json();

  if (!res.ok) {
    // Menyesuaikan dengan format standard bungkusan 'meta.message' kita
    throw new Error(json?.meta?.message || "API Error");
  }

  return json;
}
