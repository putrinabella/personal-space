import { SQL } from "drizzle-orm";
import { AnyPgColumn, AnyPgTable } from "drizzle-orm/pg-core";

export interface CrudHandlerOptions {
  table: AnyPgTable;
  entity: string;
  searchableColumns?: AnyPgColumn[];
  filterableColumns?: string[];
  defaultWhere?: SQL;
  enablePagination?: boolean;
  enableSoftDelete?: boolean;
}
