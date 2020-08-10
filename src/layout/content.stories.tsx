import React from "react";
import { storiesOf } from "@storybook/react";
import { createInstance } from "@spcy/lib.core.mst-model";
import * as Layout from "@spcy/lib.standard.layout";
import { SchemaRepository } from "@spcy/lib.core.reflection";
import { Render } from "./render";
import "./views";
import { Container } from "@material-ui/core";

SchemaRepository.registerTypes(Layout.Types);

const typo = createInstance(Layout.Types.Container, {
  elements: [
    { h1: "H1 title" },
    { h2: "H2 title" },
    { h3: "H3 title" },
    { text: "Hello1" },
    { text: "Hello2" },
  ],
});

const grid = createInstance(Layout.Types.Container, {
  elements: [
    { text: "row1" },
    { columns: [{ text: "row21" }, { text: "row21" }] },
    { text: "row3" },
  ],
});

const advanced = createInstance(Layout.Types.Row, {
  columns: [
    { text: "image" },
    {
      elements: [
        { text: " Standard license" },
        { text: "Full resolution 1920x1080 • JPEG" },
        { text: "ID: 1030114" },
        { text: "remove" },
      ],
    },
    { text: "$19.00" },
  ],
});

const container = (storyFn: any) => (
  <Container maxWidth={"md"}>{storyFn()}</Container>
);

storiesOf("Layout", module)
  .add("Typography", () => <Render model={typo} />)
  .addDecorator(container);
storiesOf("Layout", module)
  .add("Simple grid", () => <Render model={grid} />)
  .addDecorator(container);
storiesOf("Layout", module)
  .add("Advanced grid", () => <Render model={advanced} />)
  .addDecorator(container);
