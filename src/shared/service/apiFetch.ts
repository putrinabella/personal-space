type ExtendedRequestInit = RequestInit & {
  next?: NextFetchRequestConfig;
};
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

export async function apiFetch<T>(
  path: string,
  options?: ExtendedRequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
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
