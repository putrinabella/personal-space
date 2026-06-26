import { BaseItem } from "@/features/food/foods/food.types";
import IconRenderer from "./IconRenderer";
import ActionButton from "./ActionButton";
import { Pencil, Trash } from "@phosphor-icons/react";

type Props<T extends BaseItem> = {
  data: T[];
  viewType: "list" | "card";
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};
export default function DataRenderer({
  data,
  viewType,
  onEdit,
  onDelete,
}: Props<any>) {
  return (
    <div
      className={
        viewType === "card"
          ? "grid grid-cols-2 md:grid-cols-3 gap-4"
          : "flex flex-col gap-2"
      }
    >
      {data.map((item) => (
        <div
          key={item.id}
          className={`
            p-4 border  rounded-2xl bg-base-100 transition-all hover:shadow-lg group
            ${
              viewType === "card"
                ? "flex flex-col items-center justify-center gap-3 text-center"
                : "flex items-center justify-between"
            }
          `}
        >
          {/* Bagian Konten */}
          <div
            className={`flex items-center ${viewType === "card" ? "flex-col gap-2" : "gap-3"}`}
          >
            {item.iconSlug && (
              <div className="p-3 rounded-full bg-primary">
                <IconRenderer name={item.iconSlug} size={24} />
              </div>
            )}
            <h3 className="font-bold text-body">{item.name}</h3>
          </div>

          {/* Bagian Tombol Aksi */}
          <div className="flex gap-2">
            <ActionButton
              icon={Pencil}
              color="warning"
              size={16}
              onClick={() => onEdit?.(item)}
            />
            <ActionButton
              icon={Trash}
              color="error"
              size={16}
              onClick={() => onDelete?.(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
// export default function DataRenderer({
//   data,
//   viewType,
//   onEdit,
//   onDelete,
// }: Props<any>) {
//   return (
//     <div
//       className={
//         viewType === "card"
//           ? "grid grid-cols-2 md:grid-cols-3 gap-4"
//           : "flex flex-col gap-2"
//       }
//     >
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className="p-4 border rounded-2xl bg-base-100 flex items-center justify-between group"
//         >
//           <div className="flex items-center gap-3">
//             {item.iconSlug && <IconRenderer name={item.iconSlug} size={20} />}
//             <h3 className="font-bold">{item.name}</h3>
//           </div>

//           <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//             <ActionButton
//               icon={Pencil}
//               color="warning"
//               size={14}
//               onClick={() => onEdit?.(item)}
//             />
//             <ActionButton
//               icon={Trash}
//               color="error"
//               size={14}
//               onClick={() => onDelete?.(item)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
