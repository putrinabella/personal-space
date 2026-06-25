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
  validationTitle: "Perhatian",
  createSuccess: `${entity} berhasil dibuat!`,
  updateSuccess: `${entity} berhasil diperbarui!`,
  deleteSuccess: `${entity} berhasil dihapus!`,
  fetchError: `Tidak dapat mengambil ${entity}.`,
  createError: `Gagal membuat ${entity}.`,
  updateError: `Gagal memperbarui ${entity}.`,
  deleteError: `Gagal menghapus ${entity}.`,
  deleteConfirmTitle: `Hapus ${entity}?`,
  deleteConfirmText: `${entity} akan dihapus secara permanen.`,
  loadingText: "Memproses data...",
  successTitle: "Berhasil",
  errorTitle: "Terjadi Kesalahan",
});
