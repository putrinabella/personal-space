import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { TransactionEntry } from "../transaction/transaction.types";

import { Tag, Bank, Wallet } from "@phosphor-icons/react";

interface TransactionCardProps {
  transaction: TransactionEntry;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";
  const displayTitle = transaction.description || "Transaction";

  const iconColor = transaction.category?.color || "var(--color-primary)";
  const iconName = transaction.category?.iconSlug || "Briefcase";

  const numericAmount =
    typeof transaction.amount === "string"
      ? parseFloat(transaction.amount)
      : transaction.amount;

  const formattedAmount = `${isIncome ? "+" : "-"}Rp ${formatRupiah(numericAmount).replace("Rp", "").trim()}`;

  return (
    <CardBox
      className="p-4 flex flex-col gap-3.5 w-full"
      rounded="2xl"
      color="base-100"
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            style={{ backgroundColor: iconColor }}
          >
            <IconRenderer
              name={iconName}
              size={22}
              weight="bold"
              className="text-black"
            />
          </div>

          <p className="heading-h4 truncate">{displayTitle}</p>
        </div>

        <div className="flex shrink-0 text-right">
          <p
            className={`text-body font-bold ${
              isIncome ? "text-success" : "text-error"
            }`}
          >
            {formattedAmount}
          </p>
        </div>
      </div>
      {/* Hanya tampilkan garis dan badge jika minimal ada salah satu data yang tersedia */}
      {(transaction.account?.name ||
        transaction.pocket?.name ||
        transaction.category?.name) && (
        <>
          <div className="w-full h-0.5 bg-base-300" />

          <div className="flex items-center gap-2 flex-wrap">
            {transaction.account?.name && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-base-200 text-base-content border-2 border-black text-data rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Bank size={12} weight="bold" />
                {transaction.account.name}
              </span>
            )}

            {transaction.pocket?.name && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-content border-2 border-black text-data rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Wallet size={12} weight="bold" />
                {transaction.pocket.name}
              </span>
            )}

            {transaction.category?.name && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent text-accent-content border-2 border-black text-data rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Tag size={12} weight="bold" />
                {transaction.category.name}
              </span>
            )}
          </div>
        </>
      )}
    </CardBox>
  );
}
