import { db } from "@/db";
import { sendStandardResponse } from "@/lib/apiResponse";
import { eq } from "drizzle-orm";
import { AnyColumn } from "drizzle-orm";
import { CrudHandlerOptions } from "./types";

export function createDeleteHandler(options: CrudHandlerOptions) {
  return async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);

      const id = searchParams.get("id");

      if (!id) {
        return sendStandardResponse(null, "ID is required.", 400, "error");
      }

      const table = options.table as unknown as {
        id: AnyColumn;
        deletedAt: AnyColumn;
      };

      if (options.enableSoftDelete !== false) {
        await db
          .update(options.table)
          .set({
            deletedAt: new Date(),
          })
          .where(eq(table.id, id));
      } else {
        await db.delete(options.table).where(eq(table.id, id));
      }

      return sendStandardResponse(
        null,
        `${options.entity} deleted successfully.`,
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
