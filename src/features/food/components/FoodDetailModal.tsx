import CardBox from "@/shared/components/CardBox";
import { formatDateIndo } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { ForkKnife, X } from "@phosphor-icons/react";

interface ModalProps {
  food: any;
  isOpen: boolean;
  onClose: () => void;
}

export const FoodDetailModal = ({ food, isOpen, onClose }: ModalProps) => {
  if (!isOpen || !food) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <CardBox
        className="max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
        rounded="2xl"
      >
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <span className="text-caption font-bold uppercase tracking-widest text-base-content block mb-1">
              Visit History
            </span>
            <h2 className="heading-h3 font-black text-base-content">
              {food.foodName}
            </h2>
            <p className="text-caption text-base-content mt-0.5">
              {food.restaurant?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {(() => {
          const logs = [...(food.allLogs || [])].sort(
            (a, b) =>
              new Date(b.dateVisited).getTime() -
              new Date(a.dateVisited).getTime(),
          );

          if (logs.length === 0) {
            return (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <ForkKnife size={28} className="text-base-content/20" />
                <p className="text-data-body text-base-content">
                  No visit history yet.
                </p>
              </div>
            );
          }
          return (
            <div className="relative flex flex-col">
              {logs.map((log, idx) => {
                const isHisLow = log.ratingHis <= 5;
                const isHerLow = log.ratingHer <= 5;
                return (
                  <div key={log.id} className="relative pl-6">
                    {idx !== logs.length - 1 && (
                      <div className="absolute left-1.75 top-4 bottom-0 w-px bg-base-300" />
                    )}
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-base-200 border-2 border-primary" />

                    <div className="pb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-caption font-bold text-base-content">
                          {formatDateIndo(log.dateVisited)}
                        </span>
                        <span className="text-data-body font-black text-base-content tabular-nums">
                          {formatRupiah(log.price)}
                        </span>
                      </div>

                      <div className="bg-base-200/50 rounded-2xl px-4 py-3 flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isHisLow ? "border-error" : "border-accent"}`}
                            >
                              <span
                                className={`text-xs font-black ${isHisLow ? "text-error" : "text-data-body"}`}
                              >
                                {log.ratingHis}
                              </span>
                            </div>
                            <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                              Yoga
                            </span>
                          </div>

                          <div className="w-px h-6 bg-base-300" />

                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isHerLow ? "border-error" : "border-accent"}`}
                            >
                              <span
                                className={`text-xs font-black ${isHerLow ? "text-error" : "text-data-body"}`}
                              >
                                {log.ratingHer}
                              </span>
                            </div>
                            <span className="text-caption font-bold uppercase tracking-widest text-base-content">
                              Putri
                            </span>
                          </div>
                        </div>

                        {log.reviewText && (
                          <p className="text-caption text-base-content leading-relaxed border-t border-base-300/70 pt-2.5">
                            "{log.reviewText}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </CardBox>
    </div>
  );
};
