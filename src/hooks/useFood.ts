"use client";

import { useState, useEffect, useCallback } from "react";
import { foodService, FoodEntry } from "@/features/food/services/food.service";

export function useFood() {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await foodService.getAll();
      setFoods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return { foods, loading, error, refetch: fetchFoods };
}
