import { useQuery } from "@tanstack/react-query";
import {
  getFinanceAuth,
  getHousehold,
} from "@/shared/hooks/use-current-household";
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
    enabled: config.enabled !== false && !!householdId,

    transformBeforeSubmit: (data: T) => {
      if (!householdId) {
        throw new Error(
          "Household configuration is missing. Please try again.",
        );
      }
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

export function useHouseholdWithAuthForm<
  T extends { householdId?: string; createdById?: string },
>(config: any) {
  const { data: auth } = useQuery({
    queryKey: ["finance-auth"],
    queryFn: getFinanceAuth,
    staleTime: 1000 * 60 * 5,
  });

  return useBaseForm<T>({
    ...config,
    enabled: config.enabled !== false && !!auth,

    transformBeforeSubmit: (data: T) => {
      if (!auth) {
        throw new Error("User or Household configuration is missing.");
      }

      const transformed = config.transformBeforeSubmit
        ? config.transformBeforeSubmit(data)
        : data;

      return {
        ...transformed,
        householdId: auth.householdId,
        createdById: auth.userId, // Otomatis mengisi createdById
      };
    },
  });
}
