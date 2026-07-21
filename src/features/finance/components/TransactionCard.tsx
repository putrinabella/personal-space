import CardBox from "@/shared/components/CardBox";
import IconRenderer from "@/shared/components/IconRenderer";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface TransactionCardProps {
  transaction: {
    description?: string;
    title?: string; // Mendukung title dari CalendarItem
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

  // Ambil teks dari description atau fallback ke title
  const displayTitle =
    transaction.description || transaction.title || "Transaction";

  // Ambil warna dan icon secara fleksibel
  const iconColor =
    transaction.category?.color || transaction.color || "#fde047";
  const iconName =
    transaction.category?.iconSlug || transaction.iconSlug || "Briefcase";

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
          style={{ backgroundColor: iconColor }}
        >
          <IconRenderer name={iconName} size={24} weight="bold" />
        </div>

        {/* Judul & Badge Kategori/Akun/Pocket */}
        <div className="flex flex-col gap-1 min-w-0">
          <p className="heading-h4 font-black truncate text-neutral">
            {displayTitle}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Badge Kategori */}
            {transaction.category?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-caption font-bold rounded-md">
                {transaction.category.name}
              </span>
            )}

            {/* Badge Akun */}
            {transaction.account?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-caption font-bold rounded-md">
                {transaction.account.name}
              </span>
            )}

            {/* Badge Pocket */}
            {transaction.pocket?.name && (
              <span className="px-2 py-0.5 bg-neutral/10 text-neutral text-caption font-bold rounded-md">
                {transaction.pocket.name}
              </span>
            )}

            {/* Badge tambahan jika dari CalendarItem badges */}
            {transaction.badges?.map((badge, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-neutral/10 text-neutral text-caption font-bold rounded-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Nominal Uang */}
      <div className="shrink-0 text-right">
        <p
          className={`text-body font-black ${isIncome ? "text-success" : "text-secondary"}`}
        >
          {formattedAmount}
        </p>
      </div>
    </CardBox>
  );
}
