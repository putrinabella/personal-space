// "use client";
// import { getHousehold } from "@/shared/hooks/use-current-household";
// import { createContext, useContext, useEffect, useState } from "react";

// const HouseholdContext = createContext<{
//   householdId: string | null;
//   isLoading: boolean;
// }>({
//   householdId: null,
//   isLoading: true,
// });

// export function HouseholdProvider({ children }: { children: React.ReactNode }) {
//   const [householdId, setHouseholdId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadHousehold() {
//       setIsLoading(true);
//       try {
//         const id = await getHousehold(); // Memanggil fungsi server
//         setHouseholdId(id);
//       } catch (err) {
//         console.error("Failed to load household", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadHousehold();
//   }, []);

//   return (
//     <HouseholdContext.Provider value={{ householdId, isLoading }}>
//       {children}
//     </HouseholdContext.Provider>
//   );
// }

// // Hook untuk dipakai di komponen lain
// export const useHousehold = () => useContext(HouseholdContext);
