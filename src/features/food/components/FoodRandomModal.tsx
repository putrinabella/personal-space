import CardBox from "@/shared/components/CardBox";
import { DiceFour, X } from "@phosphor-icons/react";
import { FoodCard } from "./FoodCard";

export const FoodRandomModal = ({
  show,
  onClose,
  onRoll,
  food,
  loading,
}: {
  show: boolean;
  onClose: () => void;
  onRoll: () => void;
  food: any;
  loading: boolean;
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <CardBox
        className="max-w-md w-full p-6 flex flex-col gap-6"
        rounded="2xl"
      >
        {/* Header dengan Tombol Close */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-caption font-bold uppercase tracking-widest text-base-content/60 block mb-1">
              Random Pick
            </span>
            <h2 className="text-xl font-black text-base-content">
              Today's Recommendation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-12 text-center text-base-content/60">
            Finding a delicious choice...
          </div>
        ) : food ? (
          <div className="flex flex-col gap-4">
            {/* Panggil FoodCard Anda di sini */}
            <FoodCard food={food} />

            {/* Tombol Aksi */}
            <div className="flex gap-3">
              <button
                onClick={onRoll}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-content font-bold text-sm hover:opacity-90 transition-all"
              >
                <DiceFour size={18} weight="bold" />
                Roll Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-base-200 text-base-content font-bold text-sm hover:bg-base-300 transition-all"
              >
                <X size={18} weight="bold" />
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">No food found.</div>
        )}
      </CardBox>
    </div>
  );
};
