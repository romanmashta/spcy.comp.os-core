import React from "react";
import { storiesOf } from "@storybook/react";
import { button, withKnobs } from "@storybook/addon-knobs";

import { ObjectTree } from "../object-tree";

import * as Reflection from "@spcy/lib.core.reflection";
import * as Core from "@spcy/lib.model.core";
import { createInstance } from "@spcy/lib.core.mst-model";
import { Types as StoryTypes } from "./index.schema";

Reflection.SchemaRepository.registerTypes(Reflection.Types);
Reflection.SchemaRepository.registerTypes(Core.Types);
Reflection.SchemaRepository.registerTypes(StoryTypes);

const app = createInstance(Core.Types.FirebaseApp, {
  name: "Sandbox",
  config: {
    apiKey: process.env.REACT_APP_FS_API_KEY || "none",
    authDomain: "mono-space-d38be.firebaseapp.com",
    databaseURL: "https://mono-space-d38be.firebaseio.com",
    projectId: "mono-space-d38be",
    storageBucket: "mono-space-d38be.appspot.com",
    messagingSenderId: "441937998030",
    appId: "1:441937998030:web:fdba428e92505aae8e609f",
  },
});

const person = createInstance(StoryTypes.Person, {
  firstName: "john",
  lastName: "doe",
  roles: ["one", "two"],
});

storiesOf("Object Tree", module)
  .add("Simple Person", () => {
    button("Hello", () => {});
    return <ObjectTree object={person} />;
  })
  .add("Sample App", () => <ObjectTree object={app} />)
  .addDecorator(withKnobs);

setTimeout(() => {
  person.patch((self) => {
    person.lastName = "xxxxx";
  });
}, 3000);
