"use client";

import { handleApiError } from "@/lib/ErrorHandler";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseBaseAllProps<T, TParams = any, TError = Error> {
  queryKey: readonly unknown[];
  // Ubah fetcher agar fleksibel: bisa menerima parameter ATAU tanpa parameter
  fetcher: (params?: TParams) => Promise<T[]>;
  params?: TParams;
  enabled?: boolean;
  options?: Omit<UseQueryOptions<T[], TError>, "queryKey" | "queryFn">;
}

export function useBaseAll<T, TParams = any, TError = Error>({
  queryKey,
  fetcher,
  params,
  enabled = true,
  options,
}: UseBaseAllProps<T, TParams, TError>) {
  const query = useQuery({
    queryKey,
    // Panggil fetcher dengan aman (mengirim params jika ada)
    queryFn: () => fetcher(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });

  if (query.isError) {
    handleApiError(query.error);
  }

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
