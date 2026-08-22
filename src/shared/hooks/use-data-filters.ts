"use client";
import { useState } from "react";
import { useDebounce } from "./use-debounce";

interface FilterOptions {
  debounceDelay?: number;
  searchKey?: string;
}

export function useDataFilters<T extends Record<string, any>>(
  initialFilters: T,
  options: FilterOptions = {},
) {
  const { debounceDelay = 500, searchKey = "search" } = options;

  const [page, setPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [filters, setFilters] = useState<T>(initialFilters);

  const debouncedSearchValue = useDebounce(searchTitle, debounceDelay);

  const activeFilters = {
    ...filters,
    [searchKey]: debouncedSearchValue,
  };

  const handleFilterChange = (field: keyof T, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTitle(value);
    setPage(1);
  };

  const resetFilters = (overrides?: Partial<T>) => {
    setSearchTitle("");
    setFilters(
      overrides ? { ...initialFilters, ...overrides } : initialFilters,
    );
    setPage(1);
  };

  return {
    page,
    setPage,
    searchTitle,
    filters,
    activeFilters,
    handleFilterChange,
    handleSearchChange,
    resetFilters,
  };
}
