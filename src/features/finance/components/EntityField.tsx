import FormInput from "@/shared/components/FormInput";
import IconRenderer from "@/shared/components/IconRenderer";
import { useCategoriesAll } from "../categories/hooks/useCategoriesAll";
import {
  COLOR_OPTIONS,
  CURRENCY_OPTIONS,
  ICON_LIBRARY,
  TYPE_OPTIONS,
} from "@/shared/constants/entity-options";

export function EntityFields({ entity, data, setField }: any) {
  const { data: allCategories } = useCategoriesAll();

  const parentOptions = (allCategories || [])
    .filter((cat: any) => !cat.parentId && cat.id !== data.id)
    .map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));

  const currentOptions = TYPE_OPTIONS[entity as keyof typeof TYPE_OPTIONS];
  const currentIconOptions =
    ICON_LIBRARY[entity as keyof typeof ICON_LIBRARY] || [];
  const hasIcon =
    entity === "accounts" || entity === "categories" || entity === "pockets";
  return (
    <>
      {hasIcon && (
        <div className="flex flex-col items-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ backgroundColor: data.color || "#e2e8f0" }}
          >
            <IconRenderer name={data.iconSlug || "Circle"} size={42} />
          </div>

          <p className="mt-3 text-center text-sm font-bold uppercase tracking-wider text-slate-700">
            {data.name?.trim() || "New Entity"}
          </p>
        </div>
      )}

      <FormInput
        label="Name"
        value={data.name || ""}
        onChange={(val) => setField("name", val)}
      />

      {entity === "categories" && (
        <FormInput
          label="Parent Category (Optional)"
          value={data.parentId || ""}
          onChange={(val) => setField("parentId", val === "" ? null : val)}
          options={parentOptions}
          dropdownType="select"
          searchable={true}
          placeholder="No parent (Root category)"
        />
      )}

      {hasIcon && (
        <FormInput
          label="Icon"
          value={data.iconSlug || ""}
          onChange={(val) => setField("iconSlug", val)}
          options={currentIconOptions}
          searchable
        />
      )}

      <FormInput
        label="Background Color"
        value={data.color || ""}
        onChange={(val) => setField("color", val)}
        options={COLOR_OPTIONS}
        dropdownType="select"
        placeholder="Choose a color"
      />
      {entity === "accounts" && (
        <FormInput
          label="Currency"
          value={data.currency || "IDR"}
          onChange={(val) => setField("currency", val)}
          options={CURRENCY_OPTIONS}
          placeholder="Select currency"
        />
      )}
      {currentOptions && (
        <FormInput
          label="Type"
          value={data.type || ""}
          onChange={(val) => setField("type", val)}
          options={currentOptions}
          dropdownType="select"
          searchable={false}
          placeholder="Select type"
        />
      )}
    </>
  );
}
