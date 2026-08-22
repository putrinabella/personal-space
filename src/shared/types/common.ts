export interface ApiResponse<T> {
  meta: {
    success: boolean;
    message: string;
    code: number;
  };
  data: T;
  errors?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
}

export interface PaginatedMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface PaginatedParams {
  page?: number | string;
  per_page?: number | string;
  search?: string;
  [key: string]: unknown;
}
export interface PageSearchProps {
  searchParams: Promise<PaginatedParams>;
}
export interface DynamicPageProps<T = Record<string, string>> {
  params: Promise<T>;
}
