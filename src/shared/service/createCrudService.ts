import { apiFetch } from "./api";
import { buildQueryString } from "./queryBuilder";
import {
  ApiResponse,
  PaginatedResponse,
  QueryParams,
} from "@/shared/types/page.types";

interface CrudOptions {
  tag?: string;
  revalidate?: number;
  allEndpoint?: string;
  urlType?: "base" | "promotion"; // <-- 1. Tambahkan opsional urlType di sini
}

export function createCrudService<T>(basePath: string, options?: CrudOptions) {
  const tag = options?.tag ?? basePath;
  const revalidate = options?.revalidate ?? 300;
  const urlType = options?.urlType; // <-- 2. Ambil nilai urlType dari options

  return {
    /* Get Paginated */
    async getPaginated(
      params: QueryParams = {},
    ): Promise<PaginatedResponse<T>> {
      const query = buildQueryString(params);

      const json = await apiFetch<ApiResponse<PaginatedResponse<T>>>(
        `${basePath}${query}`,
        {
          next: { revalidate, tags: [tag] },
          urlType,
        },
      );

      return json.data;
    },

    /* Get Detail */
    async getDetail(id: string): Promise<T | null> {
      try {
        const json = await apiFetch<ApiResponse<T>>(`${basePath}/${id}`, {
          next: { revalidate, tags: [tag] },
          urlType,
        });

        return json.data ?? null;
      } catch {
        return null;
      }
    },

    /* Get All */
    async getAll(params: QueryParams = {}): Promise<T[]> {
      const endpoint = options?.allEndpoint ?? `${basePath}`;
      const query = buildQueryString(params);

      const json = await apiFetch<ApiResponse<T[]>>(`${endpoint}${query}`, {
        next: { revalidate, tags: [tag] },
        urlType,
      });

      return json.data;
    },

    /* Create */
    async create(payload: Partial<T>) {
      const json = await apiFetch<ApiResponse<T>>(basePath, {
        method: "POST",
        body: JSON.stringify(payload),
        urlType,
      });

      return json.data;
    },

    /* Update */
    async update(id: string, payload: Partial<T>) {
      const json = await apiFetch<ApiResponse<T>>(`${basePath}/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        urlType,
      });

      return json.data;
    },

    /* Delete */
    async delete(id: string) {
      await apiFetch(`${basePath}/${id}`, {
        method: "DELETE",
        urlType,
      });
    },
  };
}
