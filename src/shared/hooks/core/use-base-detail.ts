"use client";
import { useQuery } from "@tanstack/react-query";

interface UseBaseDetailProps<T> {
  id?: string;
  queryKey: readonly unknown[];
  fetcher: (id: string) => Promise<T>;
}

export function useBaseDetail<T>({
  id,
  queryKey,
  fetcher,
}: UseBaseDetailProps<T>) {
  const query = useQuery({
    queryKey,
    // Pastikan fetcher hanya dipanggil jika id ada
    queryFn: () => fetcher(id as string),
    enabled: !!id,
  });

  return {
    // Gunakan 'as T | null' agar tipe data konsisten
    data: (query.data ?? null) as T | null,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
