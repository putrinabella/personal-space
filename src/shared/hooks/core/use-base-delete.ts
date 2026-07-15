"use client";

import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/ErrorHandler";
import type { DaisyColor } from "@/utils/color";
import { CrudMessages, defaultCrudMessages } from "@/utils/crudMessages";
import { showAlert } from "@/shared/components/Swal";

interface UseBaseDeleteProps {
  mutationFn: (id: string) => Promise<void>;
  invalidateQueryKey?: readonly unknown[];
  entityName?: string;
  redirectTo?: string;
  onSuccess?: () => void | Promise<void>;
  messages?: CrudMessages;
}

export function useBaseDelete({
  mutationFn,
  invalidateQueryKey,
  entityName = "data",
  redirectTo,
  onSuccess,
  messages,
}: UseBaseDeleteProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const msg = useMemo(
    () => ({
      ...defaultCrudMessages(entityName),
      ...messages,
    }),
    [entityName, messages],
  );

  const mutation = useMutation({
    mutationFn,
    onSuccess: async () => {
      if (invalidateQueryKey) {
        await queryClient.invalidateQueries({
          queryKey: invalidateQueryKey,
        });
      }

      if (onSuccess) {
        await onSuccess();
      }

      if (redirectTo) {
        router.push(redirectTo);
      }

      await showAlert({
        title: msg.successTitle,
        text: msg.deleteSuccess,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      handleApiError(err, msg.deleteError);
    },
  });

  const handleDelete = async (id: string) => {
    const result = await showAlert({
      title: msg.deleteConfirmTitle,
      text: msg.deleteConfirmText,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Hapus",
      confirmButtonColor: "error" as DaisyColor,
      cancelButtonText: "Cancel",
      cancelButtonColor: "base-300" as DaisyColor,
    });
    if (!result) return;

    mutation.mutate(id);
  };

  return {
    loading: mutation.isPending,
    handleDelete,
  };
}
