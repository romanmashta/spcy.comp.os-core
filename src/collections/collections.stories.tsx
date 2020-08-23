import "typeface-roboto";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Container } from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { createInstance } from "@spcy/lib.core.mst-model";
import * as Core from "@spcy/lib.standard.core";
import * as Layout from "@spcy/lib.standard.layout";
import { Render } from "../core";
import { SchemaRepository } from "@spcy/lib.core.reflection";
import "./views";

SchemaRepository.registerTypes(Core.Types);
SchemaRepository.registerTypes(Layout.Types);

const container = (storyFn: any) => (
  <ScopedCssBaseline>
    <Container maxWidth={"md"}>{storyFn()}</Container>
  </ScopedCssBaseline>
);

const usersTable = createInstance(Core.Types.CollectionView, {
  name: "Users",
});

storiesOf("Collections", module)
  .add("Simple grid", () => <Render model={usersTable} />)
  .addDecorator(container);
