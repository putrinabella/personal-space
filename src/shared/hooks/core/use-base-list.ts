"use client";
import { PaginationResult } from "@/lib/apiResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// 1. Definisikan constraint untuk parameter yang memiliki 'page'
interface PageableParams {
  page?: number | string;
  [key: string]: unknown;
}

interface UseBaseListProps<T, P extends PageableParams> {
  queryKey: readonly unknown[];
  fetcher: (params: P) => Promise<PaginationResult<T>>;
  params: P;
  enabled?: boolean;
}

export function useBaseList<T, P extends PageableParams>({
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
    lastPage: query.data?.lastPage ?? 1,
    perPage: query.data?.perPage ?? 10,
    page: query.data?.currentPage ?? Number(params.page) ?? 1,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
