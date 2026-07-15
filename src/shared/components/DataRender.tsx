import IconRenderer from "./IconRenderer";
import ActionButton from "./ActionButton";
import { Pencil, Trash } from "@phosphor-icons/react";
import { BaseItem } from "@/shared/types/base.types";

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
          : "flex flex-col gap-3"
      }
    >
      {data.map((item) => (
        <div
          key={item.id}
          className={`
            group border-2 border-black bg-base-100 transition-all hover:translate-x-0.5 hover:translate-y-[2px] hover:shadow-none
            ${
              viewType === "card"
                ? "p-5 flex flex-col items-center justify-center gap-3 text-center rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "p-4 flex items-center justify-between rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            }
          `}
        >
          <div
            className={`flex items-center ${viewType === "card" ? "flex-col gap-3" : "gap-4"}`}
          >
            {item.iconSlug && (
              <div
                className="flex items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  backgroundColor: item.color || "#e2e8f0",
                  width: viewType === "card" ? "64px" : "48px",
                  height: viewType === "card" ? "64px" : "48px",
                }}
              >
                <IconRenderer
                  name={item.iconSlug || "Circle"}
                  size={viewType === "card" ? 28 : 20}
                />
              </div>
            )}

            <h3 className="font-black uppercase tracking-tight text-base-content text-lg">
              {item.name}
            </h3>
          </div>

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
