// import { queryKeys } from "@/lib/queryKeys";
// import { alertService } from "../alert.service";
// import { AlertEntry } from "../alert.types";
// import { useQuery } from "@tanstack/react-query";
// import { handleApiError } from "@/lib/ErrorHandler";

// export function useAlertAll() {
//   const query = useQuery({
//     queryKey: queryKeys.items.all(), // Atau sesuaikan dengan queryKey alert Anda
//     queryFn: () => alertService.getAll(),
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });

//   if (query.isError) {
//     handleApiError(query.error);
//   }

//   return {
//     // Berikan fallback objek kosong agar tidak error saat data masih loading/null
//     data: query.data ?? ({} as AlertEntry),
//     isLoading: query.isLoading,
//     isFetching: query.isFetching,
//     isError: query.isError,
//     error: query.error,
//     refetch: query.refetch,
//   };
// }
import { queryKeys } from "@/lib/queryKeys";
import { alertService } from "../alert.service";
import { useBaseAll } from "@/shared/hooks/core/use-base-all";
import { AlertEntry } from "../alert.types";

export function useAlertAll() {
  const result = useBaseAll<any>({
    queryKey: queryKeys.alert.all(),
    fetcher: alertService.getAll,
  });

  return {
    ...result,
    data: result.data as unknown as AlertEntry,
  };
}
