import React from "react";
import * as Core from "@spcy/lib.model.core";
import * as Layout from "@spcy/lib.standard.layout";
import * as UI from "@material-ui/core";

const Typography: Core.View<Layout.Typography> = (props) => {
  const {
    model: { text },
  } = props;

  return <UI.Typography variant={"body1"}>{text}</UI.Typography>;
};

const H1: Core.View<Layout.H1> = (props) => {
  const {
    model: { h1 },
  } = props;

  return <UI.Typography variant={"h4"}>{h1}</UI.Typography>;
};

const H2: Core.View<Layout.H2> = (props) => {
  const {
    model: { h2 },
  } = props;

  return <UI.Typography variant={"h5"}>{h2}</UI.Typography>;
};

const H3: Core.View<Layout.H3> = (props) => {
  const {
    model: { h3 },
  } = props;

  return <UI.Typography variant={"h6"}>{h3}</UI.Typography>;
};

Core.registerView(Layout.Types.Typography, Typography);
Core.registerView(Layout.Types.H1, H1);
Core.registerView(Layout.Types.H2, H2);
Core.registerView(Layout.Types.H3, H3);
