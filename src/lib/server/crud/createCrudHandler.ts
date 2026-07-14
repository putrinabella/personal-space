import { createDeleteHandler } from "./delete";
import { createGetHandler } from "./get";
import { createPostHandler } from "./post";
import { createPutHandler } from "./put";
import { CrudHandlerOptions } from "./types";

export function createCrudHandler(options: CrudHandlerOptions) {
  return {
    GET: createGetHandler(options),

    POST: createPostHandler(options),

    PUT: createPutHandler(options),

    DELETE: createDeleteHandler(options),
  };
}
