import { SQL } from "drizzle-orm";
import { AnyPgColumn, AnyPgTable } from "drizzle-orm/pg-core";

export interface CrudHandlerOptions {
  table: AnyPgTable;
  entity: string;
  searchableColumns?: AnyPgColumn[];
  defaultWhere?: SQL; // Tambahkan ini
  enablePagination?: boolean;
  enableSoftDelete?: boolean;
}
