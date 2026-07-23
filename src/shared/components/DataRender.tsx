import IconRenderer from "./IconRenderer";
import ActionButton from "./ActionButton";
import { Pencil, Trash } from "@phosphor-icons/react";

export default function DataRenderer({
  data,
  viewType,
  entity,
  onEdit,
  onDelete,
}: any) {
  if (entity === "categories") {
    const parents = data.filter((i: any) => !i.parentId);
    const getChildren = (pid: string) =>
      data.filter((i: any) => i.parentId === pid);

    return (
      <div className="flex flex-col gap-8">
        {parents.map((parent: any) => (
          <div key={parent.id} className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center gap-3 border-b-2 border-black pb-2">
              <h2 className="text-xl font-black uppercase tracking-wider">
                {parent.name}
              </h2>
              <ActionButton
                icon={Pencil}
                color="warning"
                size={14}
                onClick={() => onEdit?.(parent)}
              />
            </div>

            <div
              className={
                viewType === "card"
                  ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {getChildren(parent.id).map((item: any) =>
                renderItem(item, viewType, onEdit, onDelete),
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      className={
        viewType === "card"
          ? "grid grid-cols-2 md:grid-cols-3 gap-4"
          : "flex flex-col gap-3"
      }
    >
      {data.map((item: any) => renderItem(item, viewType, onEdit, onDelete))}
    </div>
  );
}

function renderItem(item: any, viewType: any, onEdit: any, onDelete: any) {
  return (
    <div
      key={item.id}
      className={`
        group border-2 border-black bg-base-100 transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none
        ${
          viewType === "card"
            ? "p-5 flex flex-col items-center justify-start gap-3 text-center rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full"
            : "p-4 flex items-center justify-between rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        }
      `}
    >
      <div
        className={`flex items-center ${viewType === "card" ? "flex-col gap-3 w-full" : "gap-4"}`}
      >
        {item.iconSlug && (
          <div
            className="flex items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"
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
        <h3 className="font-black uppercase tracking-tight text-base-content text-lg wrap-break-word w-full">
          {item.name}
        </h3>
      </div>

      <div className={`flex gap-2 ${viewType === "card" ? "mt-auto" : ""}`}>
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
  );
}
