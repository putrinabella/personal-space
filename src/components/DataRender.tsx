import { BaseItem } from "@/features/food/food.types";
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
          className="p-4 border rounded-2xl bg-base-100 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            {/* Cukup panggil berdasarkan string dari API */}
            {item.iconSlug && <IconRenderer name={item.iconSlug} size={20} />}
            <h3 className="font-bold">{item.name}</h3>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionButton
              icon={Pencil}
              color="warning"
              size={14}
              onClick={() => onEdit?.(item)}
            />
            <ActionButton
              icon={Trash}
              color="error"
              size={14}
              onClick={() => onDelete?.(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
