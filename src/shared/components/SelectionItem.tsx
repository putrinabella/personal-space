"use client";

import IconRenderer from "./IconRenderer";
type SelectionItemProps = {
  data: any[];
  viewType: "list" | "card";
  entity: "accounts" | "categories" | string;
  selectedId?: string;
  onSelect?: (item: any) => void;
  expandedParentId?: string | null;
  onToggleParent?: (parentId: string) => void;
};

export default function SelectionItem({
  data,
  viewType,
  entity,
  selectedId,
  onSelect,
  expandedParentId,
  onToggleParent,
}: SelectionItemProps) {
  if (entity === "categories") {
    const parents = data.filter((i: any) => !i.parentId);
    const getChildren = (pid: string) =>
      data.filter((i: any) => i.parentId === pid);

    // Kalau belum ada parent yang aktif, default ke parent pertama
    const activeParentId = expandedParentId ?? parents[0]?.id;

    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Tab bar parent kategori — dibikin nyatu sama gaya kartu lain (idle putih, aktif tint warna) */}
        <div
          role="tablist"
          className="flex gap-1.5 sm:gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          {parents.map((parent: any) => {
            const isActive = activeParentId === parent.id;
            return (
              <button
                key={parent.id}
                role="tab"
                type="button"
                onClick={() => onToggleParent?.(parent.id)}
                aria-selected={isActive}
                className={`
                  shrink-0 snap-start flex items-center gap-1.5 sm:gap-2
                  px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border-2
                  font-black uppercase text-xs sm:text-body whitespace-nowrap transition-colors active:scale-95
                  ${
                    isActive
                      ? "bg-secondary/20 border-secondary text-secondary-content"
                      : "bg-base-100 border-black text-base-content"
                  }
                `}
              >
                {parent.color && (
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black shrink-0"
                    style={{ backgroundColor: parent.color }}
                  />
                )}
                {parent.name}
              </button>
            );
          })}
        </div>

        {/* Panel children dari parent yang aktif */}
        {activeParentId && (
          <div
            key={activeParentId}
            className={
              viewType === "card"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 animate-in fade-in slide-in-from-top-1 duration-200"
                : "flex flex-col gap-2 sm:gap-3 animate-in fade-in slide-in-from-top-1 duration-200"
            }
          >
            {getChildren(activeParentId).length === 0 ? (
              <p className="text-xs sm:text-body font-bold text-base-content/50 col-span-full py-6 text-center">
                Belum ada kategori di sini
              </p>
            ) : (
              getChildren(activeParentId).map((item: any) => (
                <RenderItem
                  key={item.id}
                  item={item}
                  viewType={viewType}
                  entity={entity}
                  isSelected={item.id === selectedId}
                  onSelect={() => onSelect?.(item)}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // Render Default (untuk Accounts dan lainnya)
  return (
    <div
      className={
        viewType === "card"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3"
          : "flex flex-col gap-2 sm:gap-3"
      }
    >
      {data.map((item: any) => (
        <RenderItem
          key={item.id}
          item={item}
          viewType={viewType}
          entity={entity}
          isSelected={item.id === selectedId}
          onSelect={() => onSelect?.(item)}
        />
      ))}
    </div>
  );
}

// Komponen Item Tunggal
function RenderItem({ item, viewType, entity, isSelected, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className={`
        group border-2 border-black transition-all cursor-pointer
        ${
          isSelected
            ? "bg-secondary/20 border-secondary ring-0 shadow-none" // Gaya saat TERPILIH
            : "bg-base-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
        }
        ${
          viewType === "card"
            ? "p-2 sm:p-3 flex flex-col items-center gap-1.5 sm:gap-2 text-center rounded-lg sm:rounded-xl shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-full active:scale-95"
            : "p-3 sm:p-4 flex items-center justify-between rounded-lg sm:rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:scale-[0.98]"
        }
      `}
    >
      <div
        className={`flex items-center ${viewType === "card" ? "flex-col gap-1.5 sm:gap-2 w-full" : "gap-3 sm:gap-4"}`}
      >
        {/* Icon: Tetap gunakan warna asli item, tapi tambahkan opasitas jika terpilih */}
        <div
          className={`flex items-center justify-center rounded-md sm:rounded-lg border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0 transition-opacity w-8 h-8 sm:w-9 sm:h-9 ${isSelected ? "opacity-100" : "opacity-90"}`}
          style={{
            backgroundColor: item.color || "#e2e8f0",
          }}
        >
          <IconRenderer name={item.iconSlug || "Circle"} size={15} />
        </div>

        {/* Info Nama */}
        <div className="flex flex-col items-center w-full">
          <h3
            className={`font-black uppercase text-[10px] sm:text-body leading-tight ${isSelected ? "text-secondary-content" : "text-base-content"}`}
          >
            {item.name}
          </h3>
          {entity === "accounts" && (
            <span
              className={`text-xs sm:text-body font-bold truncate max-w-full ${isSelected ? "text-secondary" : "text-primary"}`}
            >
              {Number(item.currentBalance || 0).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
