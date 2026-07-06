import * as PhosphorIcons from "@phosphor-icons/react";

export const getIcon = (slug: string) => {
  const Icon = (PhosphorIcons as any)[slug];
  return Icon ? (
    <Icon size={20} weight="bold" />
  ) : (
    <PhosphorIcons.BowlSteam size={20} />
  );
};
