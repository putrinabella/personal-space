import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface TransactionCardProps {
  transaction: {
    description: string;
    amount: number | string;
    type: "income" | "expense" | string;
    category?: { name: string; iconSlug: string; color?: string };
    account?: { name: string };
    pocket?: { name: string };
  };
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  // Format nominal uang (misal: +Rp 10.000.000 atau -Rp 30.000)
  const formattedAmount = `${isIncome ? "+" : "-"}Rp ${formatRupiah(transaction.amount).replace("Rp", "").trim()}`;

  return (
    <CardBox
      className="p-4 flex items-center justify-between gap-4 w-full"
      rounded="2xl"
      color="base-100"
    >
      {/* Sisi Kiri: Icon & Informasi */}
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Box Icon dengan gaya neobrutalism */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          style={{ backgroundColor: transaction.category?.color || "#fde047" }}
        >
          <IconRenderer
            name={transaction.category?.iconSlug || "Briefcase"}
            size={24}
            weight="bold"
          />
        </div>

        {/* Judul & Badge Kategori/Akun/Pocket */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-black text-base truncate text-neutral">
            {transaction.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Badge Kategori */}
            {transaction.category && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-xs font-bold rounded-md">
                {transaction.category.name}
              </span>
            )}

            {/* Badge Akun */}
            {transaction.account && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-xs font-bold rounded-md">
                {transaction.account.name}
              </span>
            )}

            {/* Badge Pocket */}
            {transaction.pocket && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-xs font-bold rounded-md">
                {transaction.pocket.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Nominal Uang */}
      <div className="shrink-0 text-right">
        <p
          className={`font-black text-base md:text-lg ${isIncome ? "text-success" : "text-error"}`}
        >
          {formattedAmount}
        </p>
      </div>
    </CardBox>
  );
}
