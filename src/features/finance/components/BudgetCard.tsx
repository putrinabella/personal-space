import { CheckCircle, Warning } from "@phosphor-icons/react";
import { BudgetsEntry } from "../budgets/budgets.types";
import { formatRupiah } from "@/utils/rupiahFormatter";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { useRouter } from "next/navigation";

interface BudgetCardProps {
  budget: BudgetsEntry;
  baseRoute?: string;
  isClickable?: boolean;
  onItemClick?: (item: BudgetsEntry) => void;
}

export default function BudgetCard({
  budget,
  baseRoute = "",
  isClickable = true,
  onItemClick,
}: BudgetCardProps) {
  const router = useRouter();
  const targetLimit = parseFloat(budget.amount || "0");
  const totalSpent = (budget as any).totalSpent || 0;
  const remaining = (budget as any).remaining || targetLimit - totalSpent;
  const percentage =
    (budget as any).percentage ||
    (targetLimit > 0 ? (totalSpent / targetLimit) * 100 : 0);

  const isOverBudget = percentage > 100;

  let progressColor = "bg-primary";
  let badgeColor = "bg-primary/80";
  // let statusText = "On Track";

  if (isOverBudget) {
    progressColor = "bg-error";
    badgeColor = "bg-error/80";
    // statusText = "Exceeded";
  } else if (percentage >= 85) {
    progressColor = "bg-warning";
    badgeColor = "bg-warning/80";
    // statusText = "Near Limit";
  }

  const categoryName = budget.category?.name || "Category";
  const categoryColor = budget.category?.color || budget.color || "#e4e4e7";
  const iconSlug = budget.category?.iconSlug || "Folder";

  const handleCardClick = () => {
    if (!isClickable) return;
    if (onItemClick) {
      onItemClick(budget);
    } else {
      router.push(`${baseRoute}/${budget.id}`);
    }
  };
  return (
    <CardBox
      className={`relative p-3 sm:p-4 flex flex-col gap-2.5 mt-3 transition-all ${
        isClickable
          ? "hover:bg-primary/20 cursor-pointer group"
          : "cursor-default"
      }`}
      rounded="2xl"
      onClick={handleCardClick}
    >
      <div
        className={`absolute top-0 right-4 ${badgeColor} px-2 py-1 rounded-b-lg shadow-sm z-10d`}
      >
        <div
          className={`flex items-center gap-1 text-caption text-base-content font-bold`}
        >
          {isOverBudget ? (
            <Warning size={12} weight="bold" />
          ) : (
            <CheckCircle size={12} weight="bold" />
          )}
          <span>{percentage.toFixed(0)}%</span>
        </div>
      </div>
      {/* <div className="absolute -top-3 right-4 z-10">
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-bold border-2 border-neutral shadow-[2px_2px_0px_0px_#4a3e3d] bg-base-100 ${badgeColor}`}
        >
          {isOverBudget ? (
            <Warning size={12} weight="bold" />
          ) : (
            <CheckCircle size={12} weight="bold" />
          )}
          <span>{percentage.toFixed(0)}%</span>
        </div>
      </div> */}

      <div className="flex items-start justify-between gap-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl border-2 border-neutral flex items-center justify-center text-neutral shadow-[2px_2px_0px_0px_#4a3e3d]"
            style={{ backgroundColor: categoryColor }}
          >
            <IconRenderer name={iconSlug} size={18} weight="bold" />
          </div>
          <div className="min-w-0">
            <h3 className="heading-h4 truncate">{categoryName}</h3>
            <p className="text-caption truncate">{formatRupiah(targetLimit)}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-base-200 border border-neutral/40 h-1.5 sm:h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between pt-1 border-t border-base-content/10">
        <div className="flex flex-row justify-between md:gap-2 ">
          <span className="text-caption uppercase font-semibold">Spent</span>
          <span className="text-data truncate">{formatRupiah(totalSpent)}</span>
        </div>
        <div className="flex flex-row justify-between md:gap-2 ">
          <span className="text-caption uppercase font-semibold">Left</span>
          <span
            className={`text-data truncate ${remaining < 0 ? "text-error font-bold" : ""}`}
          >
            {formatRupiah(remaining)}
          </span>
        </div>
      </div>
    </CardBox>
  );
}
