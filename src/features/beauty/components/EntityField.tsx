import FormInput from "@/shared/components/FormInput";
import IconRenderer from "@/shared/components/IconRenderer";
import { useCategoriesAll } from "../categories/hooks/useCategoriesAll";
import {
  COLOR_OPTIONS,
  CURRENCY_OPTIONS,
  ICON_LIBRARY,
} from "@/shared/constants/entity-options";

export function EntityFields({ entity, data, setField }: any) {
  const { data: allCategories } = useCategoriesAll();

  const parentOptions = (allCategories || [])
    .filter((cat: any) => !cat.parentId && cat.id !== (data as any).id)
    .map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));

  const currentIconOptions =
    ICON_LIBRARY[entity as keyof typeof ICON_LIBRARY] || [];
  const hasIcon =
    entity === "accounts" ||
    entity === "categories" ||
    entity === "pockets" ||
    entity === "brands";

  const nameVal = "name" in data ? (data.name as string) : "";
  const colorVal = "color" in data ? (data.color as string) : "";
  const iconSlugVal = "iconSlug" in data ? (data.iconSlug as string) : "";
  const parentIdVal = "parentId" in data ? (data.parentId as string) : "";
  const currencyVal = "currency" in data ? (data.currency as string) : "IDR";

  return (
    <>
      {hasIcon && (
        <div className="flex flex-col items-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ backgroundColor: colorVal || "#e2e8f0" }}
          >
            <IconRenderer name={iconSlugVal || "Circle"} size={42} />
          </div>

          <p className="mt-3 text-center text-sm font-bold uppercase tracking-wider text-slate-700">
            {nameVal?.trim() || "New Entity"}
          </p>
        </div>
      )}

      <FormInput
        label="Name"
        value={nameVal || ""}
        onChange={(val) => setField("name", val)}
      />

      {entity === "categories" && (
        <FormInput
          label="Parent Category (Optional)"
          value={parentIdVal || ""}
          onChange={(val) => setField("parentId", val === "" ? null : val)}
          options={parentOptions}
          dropdownType="select"
          searchable={true}
          placeholder="No parent (Root category)"
        />
      )}

      {hasIcon && entity !== "brands" && (
        <FormInput
          label="Icon"
          value={iconSlugVal || ""}
          onChange={(val) => setField("iconSlug", val)}
          options={currentIconOptions}
          searchable
        />
      )}

      {entity === "brands" && (
        <>
          <FormInput
            label="Store Link"
            value={("storeLink" in data ? data.storeLink : "") || ""}
            onChange={(val) => setField("storeLink", val)}
            placeholder="https://tokopedia.com/store"
          />
        </>
      )}

      {(entity === "categories" || entity === "concerns") && (
        <FormInput
          label="Background Color"
          value={colorVal || ""}
          onChange={(val) => setField("color", val)}
          options={COLOR_OPTIONS}
          dropdownType="select"
          placeholder="Choose a color"
        />
      )}

      {entity === "accounts" && (
        <FormInput
          label="Currency"
          value={currencyVal}
          onChange={(val) => setField("currency", val)}
          options={CURRENCY_OPTIONS}
          placeholder="Select currency"
        />
      )}
    </>
  );
}
