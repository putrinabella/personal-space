import { useState } from "react";
import { productService } from "../product.service";
import { showAlert } from "@/shared/components/Swal";

interface UseBarcodeScannerProps {
  setField: (field: any, value: any) => void;
  setMode: (mode: "existing" | "new") => void;
}

export function useBarcodeScanner({
  setField,
  setMode,
}: UseBarcodeScannerProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedProductInfo, setScannedProductInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Handler untuk mode Existing Product
  const handleExistingScan = async (decodedText: string) => {
    try {
      const data = await productService.lookupBarcode(decodedText);

      if (data && data.item) {
        const item = data.item;
        setField("beautyItemId", item.id);
        setScannedProductInfo({ id: item.id, name: item.name });
        setIsScannerOpen(false);
      }
    } catch {
      await showAlert({
        title: "Not Found",
        text: "Barcode not found in existing products. Switch to 'Create New Product' mode if this is a new item.",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  };

  // Handler untuk mode New Product
  const handleNewScan = async (decodedText: string) => {
    setField("barcode", decodedText);

    try {
      const data = await productService.lookupBarcode(decodedText);

      // Jika barcode sudah terdaftar di sistem
      if (data && data.item) {
        const item = data.item;
        const result = await showAlert({
          title: "Product Already Exists",
          text: `This barcode is already registered for "${item.name}". Switch to 'Select Existing Product' mode?`,
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Switch Mode",
          cancelButtonText: "Stay Here",
        });

        if (result) {
          setMode("existing");
          setField("beautyItemId", item.id);
          setScannedProductInfo({ id: item.id, name: item.name });
        }
        setIsScannerOpen(false);
      }
    } catch {
      // Barcode belum ada (aman dilanjutkan sebagai produk baru)
      setIsScannerOpen(false);
    }
  };

  return {
    isScannerOpen,
    setIsScannerOpen,
    scannedProductInfo,
    handleExistingScan,
    handleNewScan,
  };
}
