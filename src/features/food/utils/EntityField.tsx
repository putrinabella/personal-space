import FormInput from "@/components/FormInput";

export function EntityFields({ entity, data, setField }: any) {
  return (
    <>
      {(entity === "categories" ||
        entity === "cuisines" ||
        entity === "diningType" ||
        entity === "tags") && (
        <FormInput
          label="Nama"
          value={data.name || ""}
          onChange={(val) => setField("name", val)}
          required
        />
      )}

      {(entity === "categories" || entity === "diningType") && (
        <FormInput
          label="Icon Slug"
          value={data.iconSlug || ""}
          onChange={(val) => setField("iconSlug", val)}
        />
      )}

      {entity === "tags" && (
        <FormInput
          label="Background Color"
          value={data.bgColor || ""}
          onChange={(val) => setField("bgColor", val)}
          placeholder="#FFFFFF"
        />
      )}
    </>
  );
}
