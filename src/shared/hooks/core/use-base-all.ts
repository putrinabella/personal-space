"use client";

import { handleApiError } from "@/lib/ErrorHandler";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseBaseAllProps<T, TError = Error> {
  queryKey: readonly unknown[];
  fetcher: () => Promise<T[]>;
  options?: Omit<UseQueryOptions<T[], TError>, "queryKey" | "queryFn">;
}

export function useBaseAll<T, TError = Error>({
  queryKey,
  fetcher,
  options,
}: UseBaseAllProps<T, TError>) {
  const query = useQuery({
    queryKey,
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
  if (query.isError) {
    handleApiError(query.error);
  }

  return {
    data: query.data ?? [],
    isLoading: query.isLoading, // Menggunakan isLoading standar
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
