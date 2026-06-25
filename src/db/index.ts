import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// 1. Definisikan interface agar tidak perlu 'as unknown' yang berlebihan
// dan menghindari error tipe pada 'global'
declare global {
  var dbConnection: postgres.Sql | undefined;
}

// 2. Gunakan singleton pattern yang aman
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

let conn: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  conn = postgres(connectionString);
} else {
  // Simpan koneksi di global agar tidak terbuat ulang saat HMR (Hot Module Replacement)
  if (!global.dbConnection) {
    global.dbConnection = postgres(connectionString);
  }
  conn = global.dbConnection;
}

export const db = drizzle(conn, { schema });
