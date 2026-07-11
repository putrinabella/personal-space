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
      <div onClick={(e) => e.stopPropagation()}>
        <CardBox
          className="max-w-md w-full p-6 flex flex-col gap-6"
          rounded="2xl"
        >
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

          {loading ? (
            <div className="py-12 text-center text-base-content/60">
              Finding a delicious choice...
            </div>
          ) : food !== null &&
            food !== undefined &&
            Object.keys(food).length > 0 ? (
            <div className="flex flex-col gap-4">
              <FoodCard food={food} />
              <CardBox
                className="px-4 py-2 flex items-center justify-center gap-2 text-data-body md:text-base font-bold"
                rounded="xl"
                color="accent"
                onClick={onRoll}
                pressable
              >
                <DiceFour weight="bold" size={18} />
                <span>Roll Again</span>
              </CardBox>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center gap-4 text-center">
              <p className="text-base-content/70">
                Oops! No food found with these filters.
              </p>
            </div>
          )}
        </CardBox>
      </div>
    </div>
  );
};
