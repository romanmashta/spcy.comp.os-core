/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from "@spcy/lib.core.reflection";
import * as m from "./person.model";

const PersonType: r.TypeInfo = {
  $id: "Person",
  $package: "comp.os-core",
  type: "object",
  properties: {
    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
    email: {
      type: "string"
    },
    roles: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};

const Person: r.Prototype<m.Person> = {
  ref: { $ref: PersonType.$id!, $refPackage: PersonType.$package! },
  typeInfo: PersonType
};

export const PersonModule: r.Module = {
  $id: "comp.os-core",
  $defs: {
    Person: PersonType
  }
};

export const Types = {
  Person
};
