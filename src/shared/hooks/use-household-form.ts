import { useQuery } from "@tanstack/react-query";
import { getHousehold } from "@/shared/hooks/use-current-household";
import { useBaseForm } from "@/shared/hooks/core/use-base-form";

export function useHouseholdForm<T extends { householdId?: string }>(
  config: any,
) {
  const { data: householdId } = useQuery({
    queryKey: ["current-household"],
    queryFn: getHousehold,
    staleTime: 1000 * 60 * 5,
  });

  return useBaseForm<T>({
    ...config,
    // Otomatis aktifkan hanya jika householdId sudah ada
    enabled: config.enabled !== false && !!householdId,

    transformBeforeSubmit: (data: T) => {
      if (!householdId) {
        throw new Error(
          "Household configuration is missing. Please try again.",
        );
      }

      // Jalankan custom transform jika ada, lalu tambahkan householdId
      const transformed = config.transformBeforeSubmit
        ? config.transformBeforeSubmit(data)
        : data;

      return {
        ...transformed,
        householdId,
      };
    },
  });
}
