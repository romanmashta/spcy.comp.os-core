import "typeface-roboto";
import React from "react";
import { storiesOf } from "@storybook/react";
import { createInstance } from "@spcy/lib.core.mst-model";
import * as Layout from "@spcy/lib.standard.layout";
import { SchemaRepository } from "@spcy/lib.core.reflection";
import { Render } from "../core";
import "./views";
import { Container } from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

SchemaRepository.registerTypes(Layout.Types);

const typo = createInstance(Layout.Types.Container, {
  elements: [
    { hh1: "hh1. Heading" },
    { hh2: "hh2. Heading" },
    { hh3: "hh3. Heading" },
    { h1: "h1. Heading" },
    { h2: "h2. Heading" },
    { h3: "h3. Heading" },
    {
      subtitle:
        "subtitle. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
    },
    {
      altSubtitle:
        "altSubtitle. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
    },
    {
      text:
        "text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
    },
    {
      altText:
        "altText. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
    },
    { buttonText: "button text" },
    { caption: "caption text" },
    { overline: "overline text" },
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
        { subtitle: "Standard license" },
        { altText: "Full resolution 1920x1080 • JPEG" },
        { altText: "ID: 1030114" },
        { buttonText: "Remove" },
      ],
    },
    { subtitle: "$19.00" },
  ],
});

const container = (storyFn: any) => (
  <ScopedCssBaseline>
    <Container maxWidth={"md"}>{storyFn()}</Container>
  </ScopedCssBaseline>
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
