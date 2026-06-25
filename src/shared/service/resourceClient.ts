import { AxiosRequestConfig, type Method } from "axios";
import {
  ApiResponse,
  PaginatedParams,
  PaginatedResponse,
} from "../types/common";

export const createResourceClient = (
  apiRequest: <T>(
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>,
) => {
  const buildQuery = (params?: PaginatedParams) => {
    if (!params) return "";

    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      if (key === "filters" && typeof value === "object") {
        Object.entries(value as Record<string, unknown>).forEach(
          ([fKey, fValue]) => {
            if (fValue !== undefined && fValue !== null) {
              query.append(fKey, String(fValue));
            }
          },
        );
      } else {
        query.append(key, String(value));
      }
    });

    return query.toString();
  };

  const getPaginatedResource = async <T>(
    endpoint: string,
    params: PaginatedParams = {},
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<PaginatedResponse<T>>> => {
    const query = buildQuery(params);
    return apiRequest<ApiResponse<PaginatedResponse<T>>>(
      "get",
      query ? `${endpoint}?${query}` : endpoint,
      undefined,
      options,
    );
  };

  return { getPaginatedResource };
};
