import { buildQueryString } from "./queryBuilder";
import { apiFetch } from "./apiFetch";
import {
  ApiResponse,
  PaginatedResponse,
  PaginatedParams,
} from "../types/common";

interface CrudOptions {
  tag?: string;
  revalidate?: number;
}

export function createCrudService<T>(basePath: string, options?: CrudOptions) {
  const tag = options?.tag ?? basePath;
  const revalidate = options?.revalidate ?? 300;

  return {
    /* 1. GET WITH PAGINATION - Sekarang menggunakan PaginatedResponse yang konsisten */
    // async getPaginated(
    //   params: PaginatedParams = { page: 1, per_page: 15 },
    // ): Promise<PaginatedResponse<T>> {
    //   const query = buildQueryString(params);
    //   const json = await apiFetch<ApiResponse<PaginatedResponse<T>>>(
    //     `${basePath}${query}`,
    //     { next: { revalidate, tags: [tag] } },
    //   );

    //   return json.data;
    // },
    async getPaginated(
      params: PaginatedParams = { page: 1, per_page: 15 },
    ): Promise<PaginatedResponse<T>> {
      const query = buildQueryString(params);
      // Panggil API
      const json = await apiFetch<any>(`${basePath}${query}`, {
        next: { revalidate, tags: [tag] },
      });

      // UNWRAP STRUKTUR API:
      // json.data (root) berisi: { items: [], meta: {...} }
      // Kita kembalikan ke bentuk PaginatedResponse yang flat
      const payload = json.data;

      return {
        items: payload.items,
        total: payload.meta.total,
        current_page: payload.meta.current_page,
        last_page: payload.meta.last_page,
        per_page: payload.meta.per_page,
        from: payload.meta.from,
        to: payload.meta.to,
      };
    },
    /* 2. GET ALL */
    async getAll(params: PaginatedParams = {}): Promise<T[]> {
      const query = buildQueryString(params);

      const json = await apiFetch<ApiResponse<T[]>>(`${basePath}${query}`, {
        next: { revalidate, tags: [tag] },
      });

      return json.data;
    },

    /* 3. GET DETAIL BY ID */
    async getDetail(id: string): Promise<T | null> {
      try {
        const json = await apiFetch<ApiResponse<T>>(`${basePath}?id=${id}`, {
          next: { revalidate, tags: [tag] },
        });

        return json.data ?? null;
      } catch {
        return null;
      }
    },

    /* 4. CREATE */
    async create(payload: Partial<T>): Promise<T> {
      const json = await apiFetch<ApiResponse<T>>(basePath, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return json.data;
    },

    /* 5. UPDATE */
    async update(id: string, payload: Partial<T>): Promise<T> {
      const json = await apiFetch<ApiResponse<T>>(basePath, {
        method: "PUT",
        body: JSON.stringify({ id, ...payload }),
      });

      return json.data;
    },

    /* 6. DELETE */
    async delete(id: string): Promise<void> {
      await apiFetch(`${basePath}?id=${id}`, {
        method: "DELETE",
      });
    },
  };
}
