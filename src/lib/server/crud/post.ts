import { db } from "@/db";
import { sendStandardResponse } from "@/lib/apiResponse";
import { CrudHandlerOptions } from "./types";

export function createPostHandler(options: CrudHandlerOptions) {
  return async function POST(request: Request) {
    try {
      const body = await request.json();

      const [item] = await db.insert(options.table).values(body).returning();

      return sendStandardResponse(
        item,
        `${options.entity} created successfully.`,
        201,
      );
    } catch (error) {
      return sendStandardResponse(
        null,
        error instanceof Error ? error.message : "Internal Server Error",
        500,
        "error",
      );
    }
  };
}
