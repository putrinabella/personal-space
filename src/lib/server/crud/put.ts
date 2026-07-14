import { db } from "@/db";
import { sendStandardResponse } from "@/lib/apiResponse";
import { eq } from "drizzle-orm";
import { AnyColumn } from "drizzle-orm";
import { CrudHandlerOptions } from "./types";

export function createPutHandler(options: CrudHandlerOptions) {
  return async function PUT(request: Request) {
    try {
      const body = await request.json();

      const { id, createdAt, updatedAt, deletedAt, ...payload } = body;

      if (!id) {
        return sendStandardResponse(null, "ID is required.", 400, "error");
      }

      const table = options.table as unknown as {
        id: AnyColumn;
      };

      const [item] = await db
        .update(options.table)
        .set({
          ...payload,
          updatedAt: new Date(),
        })
        .where(eq(table.id, id))
        .returning();

      return sendStandardResponse(
        item,
        `${options.entity} updated successfully.`,
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
