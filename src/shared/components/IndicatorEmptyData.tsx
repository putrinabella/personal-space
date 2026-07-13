import CardBox from "./CardBox";
import { MagnifyingGlassIcon, type IconProps } from "@phosphor-icons/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type IndicatorEmptyProps = {
  title?: string;
  description?: string;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  actionLabel?: string;
  onAction?: () => void;
};

export const IndicatorEmpty = ({
  title = "It's quiet in here...",
  description = "There doesn't seem to be any content yet. Once items are added, they'll show up here.",
  icon: Icon = MagnifyingGlassIcon,
  actionLabel = "Add First Item",
  onAction,
}: IndicatorEmptyProps) => {
  return (
    <CardBox
      rounded="2xl"
      color="base-100"
      className="p-12 text-center flex flex-col items-center justify-center gap-6 min-h-75"
    >
      <div className="bg-base-100 rounded-3xl p-4 shadow-sm border border-base-200">
        <Icon className="w-12 h-12 text-base-content/30" weight="light" />
      </div>

      <div className="space-y-2 max-w-sm">
        <p className="text-primary font-bold text-body uppercase">{title}</p>
        <p className="text-base-content/70 text-data-body">{description}</p>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary btn-md rounded-full hover:scale-105 transition-all flex items-center gap-2 mt-4 px-8 shadow-md shadow-primary/10"
        >
          <span className="font-bold">{actionLabel}</span>
        </button>
      )}
    </CardBox>
  );
};
