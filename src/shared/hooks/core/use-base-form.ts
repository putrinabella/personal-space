"use client";

import { useMemo, useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/ErrorHandler";
import { defaultCrudMessages, type CrudMessages } from "@/utils/crudMessages";
import { showAlert } from "@/components/Swal";

interface UseBaseFormProps<T> {
  id?: string;
  enabled?: boolean;
  entityName?: string;
  defaultValues: T;
  queryKey?: readonly unknown[];
  invalidateQueryKey?: readonly unknown[];
  getDetail?: (id: string) => Promise<T | null | undefined>;
  createFn: (data: Partial<T>) => Promise<T>;
  updateFn: (id: string, data: Partial<T>) => Promise<T>;
  validate?: (data: T) => string[];
  redirectTo?: string | ((data: unknown) => string);
  transformBeforeSubmit?: (data: T) => Partial<T>;
  messages?: CrudMessages;
}

export function useBaseForm<T>({
  id,
  enabled = true,
  entityName = "data",
  defaultValues,
  queryKey,
  invalidateQueryKey,
  getDetail,
  createFn,
  updateFn,
  validate,
  redirectTo,
  transformBeforeSubmit,
  messages,
}: UseBaseFormProps<T>) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id && id !== "create");

  // 1. Simpan hanya perubahan lokal di sini
  const [localChanges, setLocalChanges] = useState<Partial<T>>({});

  const msg = useMemo(
    () => ({
      ...defaultCrudMessages(entityName),
      ...messages,
    }),
    [entityName, messages],
  );

  const detailQuery = useQuery({
    queryKey: queryKey ?? [],
    queryFn: async () => {
      if (!id || !getDetail)
        throw new Error("ID atau getDetail tidak tersedia");

      const result = await getDetail(id);
      if (!result) throw new Error("Data tidak ditemukan"); // Tambahkan ini
      return result;
    },
    enabled: enabled && !!id && !!getDetail,
  });

  // 2. Satu-satunya sumber data (Gabungan default + server + input user)
  const data = useMemo(() => {
    return {
      ...defaultValues,
      ...(detailQuery.data || {}),
      ...localChanges,
    } as T;
  }, [defaultValues, detailQuery.data, localChanges]);

  // 3. Helper untuk memperbarui localChanges
  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setLocalChanges((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFields = useCallback((values: Partial<T>) => {
    setLocalChanges((prev) => ({ ...prev, ...values }));
  }, []);

  const resetForm = useCallback(() => {
    setLocalChanges({});
  }, []);

  // --- MUTATION ---
  const mutation = useMutation({
    mutationFn: async () => {
      const payload = transformBeforeSubmit
        ? transformBeforeSubmit(data)
        : data;
      if (isEdit && id) {
        return updateFn(id, payload);
      }
      return createFn(payload);
    },
    onSuccess: async (responseData) => {
      if (queryKey) await queryClient.invalidateQueries({ queryKey });
      if (invalidateQueryKey)
        await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });

      await showAlert({
        title: msg.successTitle,
        text: isEdit ? msg.updateSuccess : msg.createSuccess,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      if (redirectTo) {
        const destination =
          typeof redirectTo === "function"
            ? redirectTo(responseData)
            : redirectTo;
        router.push(destination);
      }
    },
    onError: (err) => {
      handleApiError(err, isEdit ? msg.updateError : msg.createError);
    },
  });

  const handleSubmit = async () => {
    const errors = validate?.(data) || [];
    if (errors.length > 0) {
      await showAlert({
        title: msg.validationTitle,
        html: errors.join("<br/>"),
        icon: "warning",
        showConfirmButton: true,
      });
      return false;
    }

    try {
      await mutation.mutateAsync();
      return true;
    } catch {
      return false;
    }
  };

  return {
    data,
    loading: detailQuery.isLoading,
    saving: mutation.isPending,
    error: detailQuery.isError,
    isEdit,
    setField,
    setFields,
    resetForm,
    handleSubmit,
    refetch: detailQuery.refetch,
    mutation,
  };
}
