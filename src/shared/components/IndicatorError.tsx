import CardBox from "./CardBox";
import { Coffee, WarningCircle } from "@phosphor-icons/react";

type IndicatorErrorProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const IndicatorError = ({
  title = "Oops! Something went wrong",
  description = "Looks like our servers took a tiny coffee break. Please try again in a bit.",
  onRetry,
}: IndicatorErrorProps) => {
  return (
    <CardBox
      rounded="2xl"
      color="base-100"
      className="p-12 text-center flex flex-col items-center justify-center gap-6 min-h-75"
    >
      <div className="relative">
        <div className="bg-error/10 rounded-full p-6">
          <Coffee className="w-16 h-16 text-error" weight="duotone" />
        </div>

        <WarningCircle
          className="w-7 h-7 text-error absolute -bottom-1 -right-1 bg-base-100 rounded-full"
          weight="fill"
        />
      </div>

      <div className="space-y-1">
        <p className="text-primary font-bold text-body uppercase">{title}</p>
        <p className="text-base-content/70 text-data-body">{description}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-error btn-sm rounded-full hover:scale-105 transition-transform flex items-center gap-2 mt-3 px-6 shadow-sm"
        >
          <WarningCircle className="w-4 h-4" />
          <span className="font-semibold">Try Again</span>
        </button>
      )}
    </CardBox>
  );
};
