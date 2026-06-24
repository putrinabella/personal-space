import {
  ApiResponse,
  PaginatedResponse,
  QueryParams,
} from "@/shared/types/page.types";
import { buildQueryString } from "./queryBuilder";
import { apiFetch } from "./apiFetch";

interface CrudOptions {
  tag?: string;
  revalidate?: number;
}

export function createCrudService<T>(basePath: string, options?: CrudOptions) {
  const tag = options?.tag ?? basePath;
  const revalidate = options?.revalidate ?? 300;

  return {
    /* 1. GET WITH PAGINATION (Wajib kirim parameter page) */
    async getPaginated(
      params: QueryParams = { page: "1", per_page: "15" }, // 🚀 Diubah menjadi string agar patuh pada QueryParams
    ): Promise<PaginatedResponse<T>> {
      const query = buildQueryString(params);

      const json = await apiFetch<ApiResponse<PaginatedResponse<T>>>(
        `${basePath}${query}`,
        { next: { revalidate, tags: [tag] } },
      );

      return json.data;
    },

    /* 2. GET ALL TANPA PAGINATION (Untuk Dropdown Form Menu) */
    async getAll(params: QueryParams = {}): Promise<T[]> {
      // Sesuai logika internal kita: jika tidak mengirim 'page', otomatis ditarik semua
      const query = buildQueryString(params);

      const json = await apiFetch<ApiResponse<T[]>>(`${basePath}${query}`, {
        next: { revalidate, tags: [tag] },
      });

      return json.data;
    },

    /* 3. GET DETAIL BY ID (Menggunakan Pola Query Internal ?id=...) 🆕 */
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

    /* 4. CREATE (POST) */
    async create(payload: Partial<T>) {
      const json = await apiFetch<ApiResponse<T>>(basePath, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return json.data;
    },

    /* 5. UPDATE (PUT) - ID disisipkan ke dalam request Body 🆕 */
    async update(id: string, payload: Partial<T>) {
      const json = await apiFetch<ApiResponse<T>>(basePath, {
        method: "PUT",
        body: JSON.stringify({ id, ...payload }), // 🛡️ Sesuai syarat API internal: ID wajib ada di body
      });

      return json.data;
    },

    /* 6. DELETE - Eksekusi Soft Delete lewat Query URL ?id=... 🆕 */
    async delete(id: string) {
      await apiFetch(`${basePath}?id=${id}`, {
        method: "DELETE",
      });
    },
  };
}
