import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface TransactionCardProps {
  transaction: {
    description?: string;
    title?: string;
    amount: number | string;
    type: "income" | "expense" | string;
    category?: { name: string; iconSlug: string; color?: string };
    account?: { name: string };
    pocket?: { name: string };
    badges?: string[];
    color?: string;
    iconSlug?: string;
  };
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  const displayTitle =
    transaction.description || transaction.title || "Transaction";

  const iconColor =
    transaction.category?.color || transaction.color || "#fde047";
  const iconName =
    transaction.category?.iconSlug || transaction.iconSlug || "Briefcase";

  const formattedAmount = `${isIncome ? "+" : "-"}Rp ${formatRupiah(transaction.amount).replace("Rp", "").trim()}`;

  return (
    <CardBox
      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full"
      rounded="2xl"
      color="base-100"
    >
      {/* Sisi Kiri: Icon & Informasi */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0 w-full">
        {/* Box Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          style={{ backgroundColor: iconColor }}
        >
          <IconRenderer name={iconName} size={24} weight="bold" />
        </div>

        {/* Judul & Badge */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <p className="heading-h4 font-black text-base-content wrap-break-word line-clamp-2">
            {displayTitle}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            {transaction.category?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-base-content text-caption font-bold rounded-md">
                {transaction.category.name}
              </span>
            )}

            {transaction.account?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-base-content text-caption font-bold rounded-md">
                {transaction.account.name}
              </span>
            )}

            {transaction.pocket?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-base-content text-caption font-bold rounded-md">
                {transaction.pocket.name}
              </span>
            )}

            {transaction.badges?.map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-neutral/10 text-base-content text-caption font-bold rounded-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Nominal Uang (Menyesuaikan posisi di mobile vs desktop) */}
      <div className="flex sm:shrink-0 justify-end sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10">
        <p
          className={`text-body font-black ${isIncome ? "text-success" : "text-secondary"}`}
        >
          {formattedAmount}
        </p>
      </div>
    </CardBox>
  );
}
