// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import CardBox from "@/shared/components/CardBox";
// import {
//   BarcodeIcon,
//   ArrowLeftIcon,
//   CheckCircleIcon,
//   WarningCircleIcon,
// } from "@phosphor-icons/react";
// import Link from "next/link";

// export default function SkincareScanPage() {
//   const [scannedResult, setScannedResult] = useState<string | null>(null);
//   const [productData, setProductData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

//   const scannerRef = useRef<Html5Qrcode | null>(null);

//   useEffect(() => {
//     const scannerId = "reader";
//     const html5QrCode = new Html5Qrcode(scannerId);
//     scannerRef.current = html5QrCode;

//     const startScanner = async () => {
//       try {
//         await html5QrCode.start(
//           { facingMode: "environment" }, // Kamera belakang HP
//           {
//             fps: 10,
//             qrbox: { width: 260, height: 160 },
//           },
//           async (decodedText) => {
//             // Jika berhasil scan, hentikan scanner sementara agar tidak multi-trigger
//             if (scannerRef.current?.isScanning) {
//               await scannerRef.current.stop();
//             }
//             setScannedResult(decodedText);
//             fetchProductByBarcode(decodedText);
//           },
//           (errorMessage) => {
//             // Frame error saat mencari barcode (normal diabaikan)
//           },
//         );
//       } catch (err) {
//         console.error("Gagal memulai kamera scanner:", err);
//         setErrorMessage(
//           "Tidak dapat mengakses kamera. Pastikan izin kamera diizinkan.",
//         );
//       }
//     };

//     startScanner();

//     return () => {
//       if (scannerRef.current && scannerRef.current.isScanning) {
//         scannerRef.current
//           .stop()
//           .catch((err) => console.error("Gagal menghentikan scanner:", err));
//       }
//     };
//   }, []);

//   // Fungsi untuk memanggil API barcode yang sudah dibuat
//   const fetchProductByBarcode = async (barcode: string) => {
//     setLoading(true);
//     setErrorMessage(null);
//     try {
//       const res = await fetch(`/api/beauty/barcode?barcode=${barcode}`);
//       const json = await res.json();

//       if (res.ok && json.data) {
//         setProductData(json.data);
//         // Otomatis pilih unit pertama (yang paling dekat expired-nya / FIFO)
//         if (json.data.activeUnits && json.data.activeUnits.length > 0) {
//           setSelectedUnitId(json.data.activeUnits[0].id);
//         }
//       } else {
//         setErrorMessage(json.message || "Barcode tidak ditemukan di sistem.");
//       }
//     } catch (err: any) {
//       setErrorMessage(err.message || "Terjadi kesalahan saat mengambil data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fungsi untuk Reset Scan (Scan ulang)
//   const handleResetScan = async () => {
//     setScannedResult(null);
//     setProductData(null);
//     setSelectedUnitId(null);
//     setErrorMessage(null);

//     if (scannerRef.current && !scannerRef.current.isScanning) {
//       try {
//         await scannerRef.current.resume();
//       } catch {
//         // Kalau gagal resume, restart ulang scanner-nya
//         window.location.reload();
//       }
//     }
//   };

//   // Simulasi konfirmasi pemakaian/pengurangan stok
//   const handleConfirmUsage = async () => {
//     if (!selectedUnitId) return;

//     // Di sini Kakak bisa tembak API PUT unit status ke "finished" yang sudah ada
//     alert(
//       `Berhasil! Unit dengan ID ${selectedUnitId} akan diproses (diubah statusnya menjadi finished).`,
//     );
//     // Contoh: await fetch('/api/beauty/units', { method: 'PUT', body: JSON.stringify({ id: selectedUnitId, status: 'finished' }) });

//     handleResetScan();
//   };

//   return (
//     <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
//       {/* Header */}
//       <header className="flex items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <CardBox
//             className="p-2.5 flex items-center justify-center shadow-sm"
//             rounded="xl"
//             color="base"
//             href="/beauty"
//             pressable
//           >
//             <ArrowLeftIcon weight="bold" size={20} />
//           </CardBox>
//           <div>
//             <span className="text-caption font-bold tracking-[0.2em] uppercase text-base-content/60 mb-0.5 block">
//               Eunoia / Scanner
//             </span>
//             <h1 className="heading-h1 font-extrabold uppercase tracking-tight text-base-content text-xl">
//               Scan Skincare
//             </h1>
//           </div>
//         </div>
//       </header>

//       {/* Area Kamera Scanner */}
//       <CardBox
//         className="p-4 flex flex-col items-center gap-4 shadow-sm"
//         rounded="2xl"
//       >
//         <div className="w-full overflow-hidden rounded-xl bg-base-300 relative min-h-[280px] flex items-center justify-center">
//           <div id="reader" className="w-full"></div>
//         </div>

//         {scannedResult && (
//           <div className="w-full text-sm bg-base-200 p-3 rounded-xl flex items-center justify-between">
//             <span className="font-mono text-xs opacity-75">
//               Barcode: {scannedResult}
//             </span>
//             <button
//               onClick={handleResetScan}
//               className="btn btn-xs btn-outline btn-accent"
//             >
//               Scan Ulang
//             </button>
//           </div>
//         )}
//       </CardBox>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center py-6">
//           <span className="loading loading-spinner loading-md text-accent"></span>
//         </div>
//       )}

//       {/* Error Message (Barcode belum terdaftar) */}
//       {errorMessage && !loading && (
//         <CardBox
//           className="p-4 bg-error/10 border-error/20 flex items-center gap-3 text-error"
//           rounded="xl"
//         >
//           <WarningCircleIcon size={24} weight="fill" />
//           <div className="flex-1 text-sm font-medium">{errorMessage}</div>
//         </CardBox>
//       )}

//       {/* Interactive Popup / Hasil Deteksi Barcode & Pilihan Unit (FIFO) */}
//       {productData && !loading && (
//         <CardBox
//           className="p-5 flex flex-col gap-4 border-2 border-accent/40 shadow-md"
//           rounded="2xl"
//         >
//           <div className="flex items-start justify-between">
//             <div>
//               <span className="text-xs font-bold uppercase tracking-wider text-accent">
//                 {productData.item.brandName}
//               </span>
//               <h2 className="text-lg font-bold text-base-content">
//                 {productData.item.name}
//               </h2>
//             </div>
//             <span className="badge badge-accent badge-soft font-semibold">
//               Terdaftar
//             </span>
//           </div>

//           <div className="divider my-0"></div>

//           <div className="flex flex-col gap-2">
//             <label className="text-xs font-bold text-base-content/70 uppercase">
//               Pilih Unit Fisik (Saran FIFO - Exp Terdekat):
//             </label>

//             {productData.activeUnits.length === 0 ? (
//               <div className="text-sm text-warning font-medium p-3 bg-warning/10 rounded-xl">
//                 Stok fisik habis! (Tidak ada unit dengan status active/backup).
//               </div>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 {productData.activeUnits.map((unit: any, index: number) => {
//                   const isSelected = selectedUnitId === unit.id;
//                   const expFormatted = unit.expiryDate
//                     ? new Date(unit.expiryDate).toLocaleDateString("id-ID", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })
//                     : "Tidak ada tanggal exp";

//                   return (
//                     <div
//                       key={unit.id}
//                       onClick={() => setSelectedUnitId(unit.id)}
//                       className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
//                         isSelected
//                           ? "border-accent bg-accent/10 font-medium"
//                           : "border-base-300 bg-base-100 hover:border-base-content/30"
//                       }`}
//                     >
//                       <div className="flex flex-col gap-0.5">
//                         <div className="text-sm flex items-center gap-2">
//                           <span className="badge badge-xs uppercase">
//                             {unit.status}
//                           </span>
//                           <span className="font-bold">Exp: {expFormatted}</span>
//                         </div>
//                         <span className="text-xs opacity-60">
//                           Beli:{" "}
//                           {unit.purchaseDate
//                             ? new Date(unit.purchaseDate).toLocaleDateString(
//                                 "id-ID",
//                               )
//                             : "-"}
//                         </span>
//                       </div>
//                       {index === 0 && (
//                         <span className="badge badge-success badge-xs font-bold text-white">
//                           Rekomendasi
//                         </span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {productData.activeUnits.length > 0 && (
//             <button
//               onClick={handleConfirmUsage}
//               className="btn btn-accent w-full mt-2 font-bold shadow-sm"
//             >
//               Konfirmasi Pemakaian Produk Ini
//             </button>
//           )}
//         </CardBox>
//       )}
//     </div>
//   );
// }
