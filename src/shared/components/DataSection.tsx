import type { LucideIcon } from "lucide-react";
import { DaisyColor } from "@/utils/color";
import { IndicatorLoading } from "./IndicatorLoading";
import { IndicatorError } from "./IndicatorError";
import { IndicatorEmpty } from "./IndicatorEmptyData";

interface DataSectionProps<T> {
  loading: boolean;
  error: boolean | Error | null;
  data: any;

  EmptyComponent?: React.ComponentType<{ message?: string }>;
  ErrorComponent?: React.ComponentType<{
    message?: string;
    onRetry?: () => void;
  }>;
  LoadingComponent?: React.ComponentType;

  emptyMessage?: string;
  errorMessage?: string;

  onRetry?: () => void;
  color?: DaisyColor;
  description?: string;
  icon?: LucideIcon;
}

export default function DataSection<T>({
  loading,
  error,
  data,
  EmptyComponent,
  ErrorComponent,
  LoadingComponent,
  emptyMessage = "It's quiet in here...",
  errorMessage = "An error occurred while loading the data",
  onRetry,
  description = "There doesn't seem to be any content yet. Once items are added, they'll show up here.",
  icon,
}: DataSectionProps<T>) {
  if (loading) {
    if (LoadingComponent) return <LoadingComponent />;
    return <IndicatorLoading text="Just a moment..." />;
  }

  if (error) {
    if (ErrorComponent)
      return <ErrorComponent message={errorMessage} onRetry={onRetry} />;
    return (
      <IndicatorError
        title="Oops! Something went wrong"
        description={errorMessage}
        onRetry={onRetry}
      />
    );
  }

  const isEmpty = data === null || (Array.isArray(data) && data.length === 0);

  if (isEmpty) {
    if (EmptyComponent) return <EmptyComponent message={emptyMessage} />;
    return (
      <IndicatorEmpty
        title={emptyMessage}
        description={description}
        icon={icon}
      />
    );
  }

  return null;
}
