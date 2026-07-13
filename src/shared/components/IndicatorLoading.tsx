import { CircleNotch } from "@phosphor-icons/react";
import CardBox from "./CardBox";

type IndicatorLoadingProps = {
  text?: string;
};

export const IndicatorLoading = ({
  text = "Just a moment...",
}: IndicatorLoadingProps) => {
  return (
    <CardBox
      rounded="2xl"
      color="base-100"
      className="p-12 text-center flex flex-col items-center justify-center gap-6 min-h-75"
    >
      <CircleNotch
        className="w-14 h-14 text-primary animate-spin"
        weight="duotone"
        speed="slow"
      />

      <div className="space-y-1">
        <p className="text-primary font-bold text-body uppercase">{text}</p>
        <p className="text-base-content/70 text-data-body">
          We are fetching the content for you.
        </p>
      </div>
    </CardBox>
  );
};
