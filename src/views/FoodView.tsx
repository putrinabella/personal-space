"use client";

import { useFood } from "@/hooks/useFood";

export default function FoodView() {
  const { foods, loading, refetch } = useFood();

  return (
    <div className="space-y-6">
      <header className="text-center mb-6 mt-4">
        <h1 className="heading-h1 text-[#FF7B9C]">Eunoia Foodie Diary 🎀</h1>
        <p className="text-subtitle italic">"What should I eat today?"</p>
      </header>

      {/* Action Button */}
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={refetch}
          className="btn btn-primary border-2 border-neutral shadow-[4px_4px_0px_#4A3E3D]"
        >
          🔄 Refresh Feed
        </button>
      </div>

      {loading && (
        <p className="text-center animate-pulse text-body">
          Cooking your memories... 🍳
        </p>
      )}

      <div className="space-y-6">
        {foods.map((food) => (
          <article
            key={food.id}
            className="bg-white border-2 border-neutral rounded-3xl p-6 shadow-[6px_6px_0px_#4A3E3D] relative overflow-hidden"
          >
            <h3 className="heading-h3">{food.foodName}</h3>
            <p className="text-sm font-semibold text-[#FF7B9C]">
              📍 {food.restaurant?.name} • Rp{" "}
              {Number(food.price).toLocaleString("id-ID")}
            </p>
            <div className="bg-[#FFFDF6] border border-neutral rounded-2xl p-3 my-3 text-body italic">
              "{food.reviewText || "No description left~"}"
            </div>
            <div className="flex justify-between items-center text-caption">
              <span className="bg-secondary px-2.5 py-1 rounded-full border border-neutral">
                💖 {food.ratingOverall}/10
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
