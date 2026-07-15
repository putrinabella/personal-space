import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
declare global {
  var dbConnection: postgres.Sql | undefined;
}
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

let conn: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  conn = postgres(connectionString);
} else {
  if (!global.dbConnection) {
    global.dbConnection = postgres(connectionString);
  }
  conn = global.dbConnection;
}

export const db = drizzle(conn, { schema });
