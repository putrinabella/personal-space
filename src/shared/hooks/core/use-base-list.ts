// src/shared/hooks/core/use-base-list.ts
"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PaginatedResponse, PaginatedParams } from "@/shared/types/common";

interface UseBaseListProps<T, P extends PaginatedParams> {
  queryKey: readonly unknown[];
  // Perbaikan tipe: fetcher sekarang langsung mengembalikan PaginatedResponse<T>
  fetcher: (params: P) => Promise<PaginatedResponse<T>>;
  params: P;
  enabled?: boolean;
}

export function useBaseList<T, P extends PaginatedParams>({
  queryKey,
  fetcher,
  params,
  enabled = true,
}: UseBaseListProps<T, P>) {
  const query = useQuery({
    queryKey,
    queryFn: () => fetcher(params),
    enabled,
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    lastPage: query.data?.last_page ?? 1,
    perPage: query.data?.per_page ?? 10,
    page: query.data?.current_page ?? Number(params.page) ?? 1,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
