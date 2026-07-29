import { CheckCircle, Warning } from "@phosphor-icons/react";
import { BudgetsEntry } from "../budgets/budgets.types";
import { formatRupiah } from "@/utils/rupiahFormatter";
import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";

interface BudgetCardProps {
  budget: BudgetsEntry;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const targetLimit = parseFloat(budget.amount || "0");
  const totalSpent = (budget as any).totalSpent || 0;
  const remaining = (budget as any).remaining || targetLimit - totalSpent;
  const percentage =
    (budget as any).percentage ||
    (targetLimit > 0 ? (totalSpent / targetLimit) * 100 : 0);

  const isOverBudget = percentage > 100;

  let progressColor = "bg-success";
  let badgeColor = "text-success";
  let statusText = "On Track";

  if (isOverBudget) {
    progressColor = "bg-error";
    badgeColor = "text-error";
    statusText = "Limit Exceeded!";
  } else if (percentage >= 85) {
    progressColor = "bg-warning";
    badgeColor = "text-warning";
    statusText = "Approaching Limit";
  }

  const categoryName = budget.category?.name || "Category";
  const categoryColor = budget.category?.color || budget.color || "#e4e4e7";
  const iconSlug = budget.category?.iconSlug || "Folder";

  return (
    <CardBox className="p-4 flex flex-col gap-2" rounded="2xl">
      {/* Header: Icon & Nama Kategori */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl border-2 border-neutral flex items-center justify-center text-neutral shadow-[2px_2px_0px_0px_#4a3e3d]"
            style={{ backgroundColor: categoryColor }}
          >
            <IconRenderer name={iconSlug} size={22} weight="bold" />
          </div>
          <div>
            <h3 className="heading-h4 text-neutral">{categoryName}</h3>
            <p className="text-caption">
              Target Limit: {formatRupiah(targetLimit)}
            </p>
          </div>
        </div>
      </div>

      {/* Spent & Percentage */}
      <div className="flex justify-between items-center text-body mb-0.5">
        <span className="text-base-content/70 font-medium text-xs md:text-sm">
          Spent:{" "}
          <strong className="text-data text-sm md:text-base">
            {formatRupiah(totalSpent)}
          </strong>
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-bold ${badgeColor}`}
        >
          {isOverBudget ? (
            <Warning size={14} weight="bold" />
          ) : (
            <CheckCircle size={14} weight="bold" />
          )}
          <span>{percentage.toFixed(1)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-base-200 border-2 border-neutral h-3.5 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Footer: Remaining & Status */}
      <div className="flex justify-between items-center text-xs pt-1">
        <span className="text-caption">
          Remaining:{" "}
          <strong
            className={remaining < 0 ? "text-error font-bold" : "text-data"}
          >
            {formatRupiah(remaining)}
          </strong>
        </span>
        <span
          className={`font-semibold tracking-wide ${
            isOverBudget ? "text-error" : "text-base-content/70"
          }`}
        >
          {statusText}
        </span>
      </div>
    </CardBox>
  );
}
