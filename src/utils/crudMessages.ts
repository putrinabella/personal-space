export interface CrudMessages {
  validationTitle?: string;
  createSuccess?: string;
  updateSuccess?: string;
  deleteSuccess?: string;
  fetchError?: string;
  createError?: string;
  updateError?: string;
  deleteError?: string;
  deleteConfirmTitle?: string;
  deleteConfirmText?: string;
  loadingText?: string;
  successTitle?: string;
  errorTitle?: string;
}

/**
 * Menggunakan Readonly untuk memastikan data ini tidak diubah secara tidak sengaja
 * di sisi client maupun server.
 */
export const defaultCrudMessages = (
  entity: string = "data",
): Readonly<Required<CrudMessages>> => ({
  validationTitle: "Validation Error",
  createSuccess: `${entity} created successfully!`,
  updateSuccess: `${entity} updated successfully!`,
  deleteSuccess: `${entity} deleted successfully!`,
  fetchError: `Failed to load ${entity}.`,
  createError: `Failed to create ${entity}.`,
  updateError: `Failed to update ${entity}.`,
  deleteError: `Failed to delete ${entity}.`,
  deleteConfirmTitle: `Delete ${entity}?`,
  deleteConfirmText: `This action will permanently delete ${entity}.`,
  loadingText: "Processing...",
  successTitle: "Success",
  errorTitle: "Error",
});
