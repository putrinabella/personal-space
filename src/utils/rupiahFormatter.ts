export function formatRupiah(angka?: number | string) {
  if (!angka) return "Rp 0";
  const number = typeof angka === "string" ? parseFloat(angka) : angka;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}
