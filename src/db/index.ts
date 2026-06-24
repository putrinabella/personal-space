// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
