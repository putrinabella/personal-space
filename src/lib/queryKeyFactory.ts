export const createQueryKeys = (base: string) => ({
  all: (params?: unknown) => [base, "all", params] as const,
  lists: () => [...[base], "list"] as const,

  list: (params?: unknown) => [...[base], "list", params] as const,

  details: () => [...[base], "detail"] as const,

  detail: (id: string) => [...[base], "detail", id] as const,
});
