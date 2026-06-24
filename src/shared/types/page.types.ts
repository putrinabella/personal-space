export interface PageSearchProps {
  searchParams: Promise<QueryParams>;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export interface ApiResponse<T> {
  errors: boolean;
  meta: {
    success: boolean;
    message: string;
    code: number;
  };
  data: T;
}

export type QueryParams = {
  page?: string;
  status?: string;
  schedule_start_date?: string;
  schedule_end_date?: string;
  name?: string;
  code_order?: string;
  registration_number?: string;
  doctor_name?: string;
  patient_name?: string;
  start_date?: string;
  end_date?: string;
  order_id?: string;
  medical_record_id?: string;
  email?: string;
  role?: string;
  doctor_polyclinic_id?: string;
  is_published?: string;
  day?: string;
  action?: string;
  feature?: string;
  user_id?: string;
  company_id?: string;
  patient_id?: string;
};

export interface DynamicPageProps<T = {}> {
  params: Promise<T>;
}
