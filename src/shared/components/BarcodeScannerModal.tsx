"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Barcode } from "@phosphor-icons/react";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
  title?: string;
}

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
  title = "Scan Barcode",
}: BarcodeScannerModalProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerId = "reusable-barcode-reader";

  useEffect(() => {
    if (!isOpen) return;

    // Beri sedikit jeda agar elemen div #scannerId siap di DOM
    const timer = setTimeout(async () => {
      const html5QrCode = new Html5Qrcode(scannerId);
      scannerRef.current = html5QrCode;

      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
          },
          async (decodedText) => {
            // Matikan scanner sebelum mengembalikan data
            if (scannerRef.current?.isScanning) {
              await scannerRef.current.stop();
            }
            onScanSuccess(decodedText);
            onClose();
          },
          () => {}, // Frame error diabaikan
        );
      } catch (err) {
        console.error("Gagal membuka kamera:", err);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Gagal menghentikan scanner:", err));
      }
    };
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-base-100 p-4 rounded-2xl max-w-md w-full flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Barcode size={22} /> {title}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <div className="w-full bg-base-300 rounded-xl overflow-hidden min-h-62.5 flex items-center justify-center">
          <div id={scannerId} className="w-full"></div>
        </div>

        <p className="text-xs text-center text-base-content/60">
          Arahkan kamera ke barcode pada kotak atau botol skincare.
        </p>
      </div>
    </div>
  );
}
