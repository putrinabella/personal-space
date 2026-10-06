// "use client";

// import { useState } from "react";
// import CardBox from "@/shared/components/CardBox";
// import CardHeader from "@/shared/components/CardHeader";
// import FormInput from "@/shared/components/FormInput";
// import { Sparkle, Check, X } from "@phosphor-icons/react";
// import { useRouter } from "next/navigation";
// import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";
// import { useBrandsAll } from "@/features/beauty/brands/hooks/useBrandsAll";
// import { useConcernsAll } from "@/features/beauty/concerns/hooks/useConcernsAll";
// import { useProductForm } from "@/features/beauty/product/hooks/useProductForm";
// import { useProductAll } from "@/features/beauty/product/hooks/useProductAll";

// export default function CreateBeautyItemUnitPage() {
//   const router = useRouter();
//   const [mode, setMode] = useState<"existing" | "new">("existing");
//   const { data, setField, handleSubmit, saving } = useProductForm();

//   const { data: categories, isLoading: loadingCategories } = useCategoriesAll();
//   const { data: brands, isLoading: loadingBrands } = useBrandsAll();
//   const { data: concerns, isLoading: loadingConcerns } = useConcernsAll();
//   const { data: existingProduct, isLoading: loadingProduct } = useProductAll();

//   const childCategories = categories.filter(
//     (category: any) => category.parentId !== null,
//   );

//   const onSave = async () => {
//     setField("isNewProduct", mode === "new");
//     await handleSubmit();
//   };

//   const statusOptions = [
//     { label: "Active", value: "active" },
//     { label: "Backup", value: "backup" },
//     { label: "Finished", value: "finished" },
//     { label: "Discarded", value: "discarded" },
//     { label: "Expired", value: "expired" },
//   ];

//   return (
//     <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
//       <CardHeader
//         title="ADD SKINCARE INVENTORY"
//         icon={Sparkle}
//         color="secondary"
//       />

//       <CardBox
//         className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
//         rounded="2xl"
//       >
//         {/* Mode Switcher */}
//         <div className="flex bg-base-200 p-1 rounded-xl">
//           <button
//             onClick={() => setMode("existing")}
//             className={`flex-1 py-2 rounded-lg font-bold transition ${
//               mode === "existing" ? "bg-white shadow" : "opacity-60"
//             }`}
//           >
//             Select Existing Product
//           </button>
//           <button
//             onClick={() => setMode("new")}
//             className={`flex-1 py-2 rounded-lg font-bold transition ${
//               mode === "new" ? "bg-white shadow" : "opacity-60"
//             }`}
//           >
//             Create New Product & Unit
//           </button>
//         </div>

//         {/* Dynamic Section based on Mode */}
//         {mode === "existing" ? (
//           <div className="flex flex-col gap-4">
//             <FormInput
//               label="Select Product *"
//               options={existingProduct.map((item: any) => ({
//                 label: `${item.name} (${item.brand?.name || "Unknown Brand"})`,
//                 value: item.id,
//               }))}
//               dropdownType="select"
//               value={data.beautyItemId}
//               onChange={(val) => setField("beautyItemId", val)}
//               placeholder={
//                 loadingProduct
//                   ? "Loading products..."
//                   : "Select existing product"
//               }
//               disabled={loadingProduct}
//             />
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4 p-4 border border-secondary/20 rounded-xl bg-secondary/5">
//             <p className="font-bold text-secondary">
//               New Product Master Details
//             </p>

//             <FormInput
//               label="Product Name *"
//               placeholder="e.g. Skin1004 Madagascar Centella Ampoule"
//               value={data.name}
//               onChange={(val) => setField("name", val)}
//             />

//             {/* Grid rapi 2 kolom untuk Category, Brand, Store, dan Min Stock */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormInput
//                 label="Category *"
//                 options={childCategories.map((cat: any) => ({
//                   label: cat.name,
//                   value: cat.id,
//                 }))}
//                 dropdownType="select"
//                 value={data.categoryId}
//                 onChange={(val) => setField("categoryId", val)}
//                 placeholder="Select category"
//                 disabled={loadingCategories}
//               />
//               <FormInput
//                 label="Brand *"
//                 options={brands.map((brand: any) => ({
//                   label: brand.name,
//                   value: brand.id,
//                 }))}
//                 dropdownType="select"
//                 value={data.brandId}
//                 onChange={(val) => setField("brandId", val)}
//                 placeholder="Select brand"
//                 disabled={loadingBrands}
//               />
//               <FormInput
//                 label="Minimum Stock Warning"
//                 type="number"
//                 placeholder="1"
//                 value={data.minStock}
//                 onChange={(val) => setField("minStock", val)}
//               />
//               <FormInput
//                 label="Rating (1-5)"
//                 type="number"
//                 placeholder="e.g. 5"
//                 value={data.rating ?? ""}
//                 onChange={(val) => setField("rating", val)}
//               />
//             </div>

//             {/* Skin Concerns Selection */}
//             <div className="space-y-2 pt-2">
//               <label className="text-sm font-semibold text-base-content/85">
//                 Skin Concerns
//               </label>
//               {loadingConcerns ? (
//                 <p className="text-xs text-base-content/50">
//                   Loading concerns...
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-1">
//                   {concerns.map((con: any) => {
//                     const isSelected =
//                       Array.isArray(data.concernIds) &&
//                       data.concernIds.includes(con.id);
//                     return (
//                       <CardBox
//                         key={con.id}
//                         className={`p-3 flex items-center justify-between text-sm cursor-pointer transition-all ${
//                           isSelected
//                             ? "border-2 border-secondary bg-secondary/10 font-semibold"
//                             : "bg-base-200/50 hover:bg-base-200"
//                         }`}
//                         rounded="xl"
//                         pressable
//                         onClick={() => {
//                           const currentList = Array.isArray(data.concernIds)
//                             ? [...data.concernIds]
//                             : [];
//                           if (isSelected) {
//                             const updated = currentList.filter(
//                               (id) => id !== con.id,
//                             );
//                             setField("concernIds", updated);
//                           } else {
//                             currentList.push(con.id);
//                             setField("concernIds", currentList);
//                           }
//                         }}
//                       >
//                         <span className="truncate">{con.name}</span>
//                         <div
//                           className={`w-5 h-5 rounded-md flex items-center justify-center border ${
//                             isSelected
//                               ? "bg-secondary border-secondary text-secondary-content"
//                               : "border-base-300"
//                           }`}
//                         >
//                           {isSelected && <Check size={14} weight="bold" />}
//                         </div>
//                       </CardBox>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             <FormInput
//               label="Notes (Optional)"
//               placeholder="Add extra details, ingredients, or review notes..."
//               value={data.notes}
//               onChange={(val) => setField("notes", val)}
//             />
//           </div>
//         )}

//         <hr className="my-1 border-base-300" />

//         <p className="font-bold">Physical Unit / Batch Details</p>

//         {/* Physical Unit Form Fields */}
//         <div className="flex flex-col gap-4">
//           <FormInput
//             label="Status *"
//             options={statusOptions}
//             dropdownType="select"
//             value={data.status || "active"}
//             onChange={(val) => setField("status", val)}
//             placeholder="Select status"
//           />

//           <FormInput
//             label="Price"
//             type="money"
//             placeholder="0"
//             value={data.price ?? ""}
//             onChange={(val) => setField("price", val)}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="Purchase Date"
//               type="date"
//               value={data.purchaseDate ? data.purchaseDate.split("T")[0] : ""}
//               onChange={(val) => setField("purchaseDate", val)}
//             />
//             <FormInput
//               label="Expiry Date"
//               type="date"
//               value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
//               onChange={(val) => setField("expiryDate", val)}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormInput
//               label="Date Opened"
//               type="date"
//               value={data.dateOpened ? data.dateOpened.split("T")[0] : ""}
//               onChange={(val) => setField("dateOpened", val)}
//             />
//             <FormInput
//               label="PAO (Period After Opening) in Months"
//               type="number"
//               placeholder="e.g. 12"
//               value={data.paoMonths ?? ""}
//               onChange={(val) => setField("paoMonths", val)}
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 pt-4">
//           <CardBox
//             className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
//             rounded="xl"
//             color="accent"
//             onClick={onSave}
//             pressable
//           >
//             {saving ? (
//               "Saving Unit..."
//             ) : (
//               <>
//                 <Check size={18} /> Save Unit Entry
//               </>
//             )}
//           </CardBox>
//           <CardBox
//             className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
//             rounded="xl"
//             color="base-300"
//             onClick={() => router.back()}
//             pressable
//           >
//             <X size={18} /> Cancel
//           </CardBox>
//         </div>
//       </CardBox>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import CardBox from "@/shared/components/CardBox";
import CardHeader from "@/shared/components/CardHeader";
import FormInput from "@/shared/components/FormInput";
import { Sparkle, Check, X, Camera } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCategoriesAll } from "@/features/beauty/categories/hooks/useCategoriesAll";
import { useBrandsAll } from "@/features/beauty/brands/hooks/useBrandsAll";
import { useConcernsAll } from "@/features/beauty/concerns/hooks/useConcernsAll";
import { useProductForm } from "@/features/beauty/product/hooks/useProductForm";
import { useProductAll } from "@/features/beauty/product/hooks/useProductAll";
import BarcodeScannerModal from "@/shared/components/BarcodeScannerModal";

export default function CreateBeautyItemUnitPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const { data, setField, handleSubmit, saving } = useProductForm();

  const { data: categories, isLoading: loadingCategories } = useCategoriesAll();
  const { data: brands, isLoading: loadingBrands } = useBrandsAll();
  const { data: concerns, isLoading: loadingConcerns } = useConcernsAll();
  const { data: existingProduct, isLoading: loadingProduct } = useProductAll();

  const childCategories = categories.filter(
    (category: any) => category.parentId !== null,
  );

  const onSave = async () => {
    setField("isNewProduct", mode === "new");
    await handleSubmit();
  };

  const handleScanSuccess = async (decodedText: string) => {
    setField("barcode", decodedText);

    // Opsional: Cek apakah barcode ini sudah terdaftar di sistem
    try {
      const res = await fetch(`/api/beauty/barcode?barcode=${decodedText}`);
      const json = await res.json();
      if (res.ok && json.data) {
        const confirmUseExisting = window.confirm(
          `Barcode ini sudah terdaftar untuk produk "${json.data.item.name}". Pindah ke mode Select Existing Product?`,
        );
        if (confirmUseExisting) {
          setMode("existing");
          setField("beautyItemId", json.data.item.id);
        }
      }
    } catch {
      // Barcode belum ada, aman dilanjutkan sebagai produk baru
    }
  };

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Backup", value: "backup" },
    { label: "Finished", value: "finished" },
    { label: "Discarded", value: "discarded" },
    { label: "Expired", value: "expired" },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
      <CardHeader
        title="ADD SKINCARE INVENTORY"
        icon={Sparkle}
        color="secondary"
      />

      <CardBox
        className="p-4 md:p-6 flex flex-col gap-4 md:gap-6"
        rounded="2xl"
      >
        {/* Mode Switcher */}
        <div className="flex bg-base-200 p-1 rounded-xl">
          <button
            onClick={() => setMode("existing")}
            className={`flex-1 py-2 rounded-lg font-bold transition ${
              mode === "existing" ? "bg-white shadow" : "opacity-60"
            }`}
          >
            Select Existing Product
          </button>
          <button
            onClick={() => setMode("new")}
            className={`flex-1 py-2 rounded-lg font-bold transition ${
              mode === "new" ? "bg-white shadow" : "opacity-60"
            }`}
          >
            Create New Product & Unit
          </button>
        </div>

        {/* Dynamic Section based on Mode */}
        {mode === "existing" ? (
          <div className="flex flex-col gap-4">
            <FormInput
              label="Select Product *"
              options={existingProduct.map((item: any) => ({
                label: `${item.name} (${item.brand?.name || "Unknown Brand"})`,
                value: item.id,
              }))}
              dropdownType="select"
              value={data.beautyItemId}
              onChange={(val) => setField("beautyItemId", val)}
              placeholder={
                loadingProduct
                  ? "Loading products..."
                  : "Select existing product"
              }
              disabled={loadingProduct}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 border border-secondary/20 rounded-xl bg-secondary/5">
            <p className="font-bold text-secondary">
              New Product Master Details
            </p>
            <div className="flex flex-col gap-2">
              {/* Main Scan Button */}
              <CardBox
                className="w-full py-4 flex items-center justify-center gap-2 font-bold text-base shadow-sm"
                rounded="xl"
                color="secondary"
                onClick={() => setIsScannerOpen(true)}
                pressable
                shadowSize="md"
              >
                <Camera size={22} weight="bold" />
                <span>
                  {data.barcode
                    ? `Barcode: ${data.barcode} (Tap to Re-scan)`
                    : "Tap Here to Scan Barcode"}
                </span>
              </CardBox>

              {/* Minimalist Helper & Toggle */}
              <div className="flex justify-between items-center text-xs px-1">
                <span className="text-base-content/60">
                  {data.barcode
                    ? "Barcode successfully captured."
                    : "Camera not working? Enter manually."}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const manualInput = document.getElementById(
                      "manual-barcode-input",
                    );
                    if (manualInput) manualInput.classList.toggle("hidden");
                  }}
                  className="text-secondary font-semibold hover:underline"
                >
                  {data.barcode ? "Edit Barcode" : "Type manually"}
                </button>
              </div>

              {/* Hidden Input toggled by "Type manually" */}
              <div id="manual-barcode-input" className="hidden pt-1">
                <FormInput
                  label=""
                  placeholder="Type barcode number here..."
                  value={data.barcode || ""}
                  onChange={(val) => setField("barcode", val)}
                />
              </div>
            </div>

            <FormInput
              label="Product Name *"
              placeholder="e.g. Skin1004 Madagascar Centella Ampoule"
              value={data.name}
              onChange={(val) => setField("name", val)}
            />

            {/* Grid rapi 2 kolom untuk Category, Brand, Store, dan Min Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Category *"
                options={childCategories.map((cat: any) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                dropdownType="select"
                value={data.categoryId}
                onChange={(val) => setField("categoryId", val)}
                placeholder="Select category"
                disabled={loadingCategories}
              />
              <FormInput
                label="Brand *"
                options={brands.map((brand: any) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
                dropdownType="select"
                value={data.brandId}
                onChange={(val) => setField("brandId", val)}
                placeholder="Select brand"
                disabled={loadingBrands}
              />
              <FormInput
                label="Minimum Stock Warning"
                type="number"
                placeholder="1"
                value={data.minStock}
                onChange={(val) => setField("minStock", val)}
              />
              <FormInput
                label="Rating (1-5)"
                type="number"
                placeholder="e.g. 5"
                value={data.rating ?? ""}
                onChange={(val) => setField("rating", val)}
              />
            </div>

            {/* Skin Concerns Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-base-content/85">
                Skin Concerns
              </label>
              {loadingConcerns ? (
                <p className="text-xs text-base-content/50">
                  Loading concerns...
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                  {concerns.map((con: any) => {
                    const isSelected =
                      Array.isArray(data.concernIds) &&
                      data.concernIds.includes(con.id);
                    return (
                      <CardBox
                        key={con.id}
                        className={`p-3 flex items-center justify-between text-sm cursor-pointer transition-all ${
                          isSelected
                            ? "border-2 border-secondary bg-secondary/10 font-semibold"
                            : "bg-base-200/50 hover:bg-base-200"
                        }`}
                        rounded="xl"
                        pressable
                        onClick={() => {
                          const currentList = Array.isArray(data.concernIds)
                            ? [...data.concernIds]
                            : [];
                          if (isSelected) {
                            const updated = currentList.filter(
                              (id) => id !== con.id,
                            );
                            setField("concernIds", updated);
                          } else {
                            currentList.push(con.id);
                            setField("concernIds", currentList);
                          }
                        }}
                      >
                        <span className="truncate">{con.name}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected
                              ? "bg-secondary border-secondary text-secondary-content"
                              : "border-base-300"
                          }`}
                        >
                          {isSelected && <Check size={14} weight="bold" />}
                        </div>
                      </CardBox>
                    );
                  })}
                </div>
              )}
            </div>

            <FormInput
              label="Notes (Optional)"
              placeholder="Add extra details, ingredients, or review notes..."
              value={data.notes}
              onChange={(val) => setField("notes", val)}
            />
          </div>
        )}

        <hr className="my-1 border-base-300" />

        <p className="font-bold">Physical Unit / Batch Details</p>

        {/* Physical Unit Form Fields */}
        <div className="flex flex-col gap-4">
          <FormInput
            label="Status *"
            options={statusOptions}
            dropdownType="select"
            value={data.status || "active"}
            onChange={(val) => setField("status", val)}
            placeholder="Select status"
          />

          <FormInput
            label="Price"
            type="money"
            placeholder="0"
            value={data.price ?? ""}
            onChange={(val) => setField("price", val)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Purchase Date"
              type="date"
              value={data.purchaseDate ? data.purchaseDate.split("T")[0] : ""}
              onChange={(val) => setField("purchaseDate", val)}
            />
            <FormInput
              label="Expiry Date"
              type="date"
              value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
              onChange={(val) => setField("expiryDate", val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Date Opened"
              type="date"
              value={data.dateOpened ? data.dateOpened.split("T")[0] : ""}
              onChange={(val) => setField("dateOpened", val)}
            />
            <FormInput
              label="PAO (Period After Opening) in Months"
              type="number"
              placeholder="e.g. 12"
              value={data.paoMonths ?? ""}
              onChange={(val) => setField("paoMonths", val)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="accent"
            onClick={onSave}
            pressable
          >
            {saving ? (
              "Saving Unit..."
            ) : (
              <>
                <Check size={18} /> Save Unit Entry
              </>
            )}
          </CardBox>
          <CardBox
            className="px-6 py-3 flex items-center justify-center gap-2 font-bold flex-1"
            rounded="xl"
            color="base-300"
            onClick={() => router.back()}
            pressable
          >
            <X size={18} /> Cancel
          </CardBox>
        </div>
      </CardBox>

      {/* Modal Scanner Kamera Reusable */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        title="Scan Barcode Produk Baru"
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
