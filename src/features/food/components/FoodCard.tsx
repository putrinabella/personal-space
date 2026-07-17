import CardBox from "@/shared/components/CardBox";
import { getIcon } from "@/shared/components/GetIcon";
import { formatDateIndo } from "@/utils/dateFormatter";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { ArrowUpRight, Heart, MapPinAreaIcon } from "@phosphor-icons/react";
import { FoodEntry } from "../dashboard/food.types";

interface FoodCardProps {
  food: FoodEntry;
  onDetailClick?: (food: FoodEntry) => void;
}

export const FoodCard = ({ food, onDetailClick }: FoodCardProps) => {
  const isHisLow = food.latestLog?.ratingHis <= 5;
  const isHerLow = food.latestLog?.ratingHer <= 5;

  return (
    <CardBox
      onClick={() => onDetailClick?.(food)}
      pressable={!!onDetailClick}
      key={food.id}
      className="group relative p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-base-200 overflow-hidden"
      rounded="2xl"
      color="base-100"
    >
      {food.restaurant?.isFavoriteRestaurant && (
        <div className="absolute top-0 right-4 bg-error text-error-content px-2 py-1 rounded-b-lg shadow-sm z-10">
          <Heart weight="fill" size={14} />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-primary/40 text-base-content rounded-2xl group-hover:bg-accent group-hover:text-accent-content transition-colors duration-300">
          {getIcon(food.category?.iconSlug || "BowlSteam")}
        </div>
        <div className="flex flex-col items-start justify-start flex-1 min-w-0 text-left">
          <h3 className="font-extrabold tracking-tight text-base-content group-hover:text-accent transition-colors truncate w-full">
            {food.foodName}
          </h3>
          <p className="text-caption font-semibold uppercase tracking-wide text-base-content truncate w-full">
            {food.category?.name} • {food.cuisine?.name}
          </p>
        </div>
      </div>

      {food.latestLog && (
        <div className="relative -mx-5">
          <div className="border-t-2 border-dashed border-base-300" />
          <div className="absolute -left-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
          <div className="absolute -right-2 -top-2.5 w-5 h-5 rounded-full bg-base-200" />
        </div>
      )}

      {food.latestLog && (
        <div className="flex items-center justify-center gap-6 py-1">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-11 h-11 rounded-full border-2 border-accent flex items-center justify-center ${isHisLow ? "border-error" : "border-accent"}`}
            >
              <span
                className={`font-black text-accent ${isHisLow ? "text-error" : "text-body "}`}
              >
                {food.latestLog.ratingHis}
              </span>
            </div>

            <span className="text-caption font-bold uppercase tracking-widest text-base-content">
              Yoga
            </span>
          </div>

          <div className="w-px h-8 bg-base-300" />

          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-11 h-11 rounded-full border-2 border-accent flex items-center justify-center ${isHerLow ? "border-error" : "border-accent"}`}
            >
              <span
                className={`font-black text-accent ${isHerLow ? "text-error" : "text-body "}`}
              >
                {food.latestLog.ratingHer}
              </span>
            </div>
            <span className="text-caption font-bold uppercase tracking-widest text-base-content">
              Putri
            </span>
          </div>

          {food.diningType && (
            <>
              <div className="w-px h-8 bg-base-300" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full bg-base-200 flex items-center justify-center text-base-content">
                  {getIcon(food.diningType.iconSlug || "ForkKnife")}
                </div>
                <span className="text-caption font-bold uppercase tracking-widest text-base-content truncate max-w-15">
                  {food.diningType.name}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex items-stretch bg-base-200 rounded-xl overflow-hidden text-caption">
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3">
          <span className="font-bold uppercase tracking-widest text-base-content">
            Price
          </span>
          <span className="text-body font-black text-base-content">
            {formatRupiah(food.latestLog?.price)}
          </span>
        </div>
        <div className="w-px bg-base-300" />
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3">
          <span className=" font-bold uppercase tracking-widest text-base-content">
            Visits
          </span>
          <span className="text-body font-black text-base-content">
            {food.totalLogs}x
          </span>
        </div>
      </div>

      {food.latestLog?.reviewText && (
        <div className="flex items-start gap-2.5 pl-3 border-l-2 border-base-300 text-caption text-base-content">
          <p className="line-clamp-2 flex-1 text-left">
            "{food.latestLog.reviewText}"
          </p>
          <span className="text-caption font-bold text-base-content uppercase whitespace-nowrap shrink-0">
            {formatDateIndo(food.latestLog.dateVisited, true)}
          </span>
        </div>
      )}

      <div className="border-t border-base-300 pt-3 mt-1 text-left">
        <a
          href={food.restaurant?.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-start gap-2 text-base-content group/link w-full overflow-hidden transition-colors duration-300 hover:text-accent"
        >
          <div className="mt-0.5 shrink-0 transition-colors duration-300 group-hover/link:text-accent">
            <MapPinAreaIcon size={16} />
          </div>

          <div className="flex flex-col min-w-0 transition-colors duration-300">
            <span className="text-caption uppercase font-bold truncate group-hover/link:text-accent transition-colors duration-300">
              {food.restaurant?.name}
            </span>

            <span className="text-caption uppercase truncate leading-tight group-hover/link:text-accent transition-colors duration-300">
              {food.restaurant?.address}
            </span>
          </div>

          <div className="ml-auto mt-0.5 shrink-0 transition-colors duration-300 group-hover/link:text-accent">
            <ArrowUpRight
              size={14}
              className="opacity-0 group-hover/link:opacity-100 transition-opacity"
            />
          </div>
        </a>
      </div>
    </CardBox>
  );
};
