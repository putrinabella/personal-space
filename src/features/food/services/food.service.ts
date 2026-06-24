// export interface FoodEntry {
//   id: string;
//   foodName: string;
//   price: string;
//   reviewText: string;
//   ratingOverall: number;
//   dateVisited: string;
//   isFavoriteFood: boolean;
//   category: { name: string; iconSlug: string };
//   restaurant: { name: string; address: string };
//   tags: { tag: { name: string; bgColor: string } }[];
// }

// export const foodService = {
//   // GET ALL
//   getAll: async (): Promise<FoodEntry[]> => {
//     const res = await fetch("/api/food");
//     if (!res.ok) throw new Error("Failed to fetch food memories");
//     return res.json();
//   },

//   // CREATE
//   create: async (data: Partial<FoodEntry>) => {
//     const res = await fetch("/api/food", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return res.json();
//   },
// };
import { createCrudService } from "@/shared/service/createCrudService";
import { McuPackageItem } from "../types/mcu.package.types";

export const mcuPackageService = createCrudService<McuPackageItem>(
  "/promotions/mcu-packages",
  {
    tag: "mcu-packages",
    urlType: "promotion",
  },
);
