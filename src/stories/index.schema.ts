/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from "@spcy/lib.core.reflection";
import { PersonModule, Types as PersonTypes } from "./person.schema";

export const IndexModule: r.Module = {
  $id: "comp.os-core",
  $defs: {
    ...PersonModule.$defs
  }
};

export const Types = {
  ...PersonTypes
};
