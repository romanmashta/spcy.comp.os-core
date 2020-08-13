import React from "react";
import * as Core from "@spcy/lib.model.core";
import * as Layout from "@spcy/lib.standard.layout";
import * as UI from "@material-ui/core";

const Text: Core.View<Layout.Text> = (props) => {
  const {
    model: { text },
  } = props;

  return <UI.Typography variant={"body1"}>{text}</UI.Typography>;
};

const AltText: Core.View<Layout.AltText> = (props) => {
  const {
    model: { altText },
  } = props;

  return <UI.Typography variant={"body2"}>{altText}</UI.Typography>;
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

const HH1: Core.View<Layout.HH1> = (props) => {
  const {
    model: { hh1 },
  } = props;

  return <UI.Typography variant={"h1"}>{hh1}</UI.Typography>;
};

const HH2: Core.View<Layout.HH2> = (props) => {
  const {
    model: { hh2 },
  } = props;

  return <UI.Typography variant={"h2"}>{hh2}</UI.Typography>;
};

const HH3: Core.View<Layout.HH3> = (props) => {
  const {
    model: { hh3 },
  } = props;

  return <UI.Typography variant={"h3"}>{hh3}</UI.Typography>;
};

const Subtitle: Core.View<Layout.Subtitle> = (props) => {
  const {
    model: { subtitle },
  } = props;

  return <UI.Typography variant={"subtitle1"}>{subtitle}</UI.Typography>;
};

const AltSubtitle: Core.View<Layout.AltSubtitle> = (props) => {
  const {
    model: { altSubtitle },
  } = props;

  return <UI.Typography variant={"subtitle2"}>{altSubtitle}</UI.Typography>;
};

const Caption: Core.View<Layout.Caption> = (props) => {
  const {
    model: { caption },
  } = props;

  return <UI.Typography variant={"caption"}>{caption}</UI.Typography>;
};

const ButtonText: Core.View<Layout.ButtonText> = (props) => {
  const {
    model: { buttonText },
  } = props;

  return <UI.Typography variant={"button"}>{buttonText}</UI.Typography>;
};

const Overline: Core.View<Layout.Overline> = (props) => {
  const {
    model: { overline },
  } = props;

  return <UI.Typography variant={"overline"}>{overline}</UI.Typography>;
};

Core.registerView(Layout.Types.Text, Text);
Core.registerView(Layout.Types.AltText, AltText);
Core.registerView(Layout.Types.HH1, HH1);
Core.registerView(Layout.Types.HH2, HH2);
Core.registerView(Layout.Types.HH3, HH3);
Core.registerView(Layout.Types.H1, H1);
Core.registerView(Layout.Types.H2, H2);
Core.registerView(Layout.Types.H3, H3);
Core.registerView(Layout.Types.Subtitle, Subtitle);
Core.registerView(Layout.Types.AltSubtitle, AltSubtitle);
Core.registerView(Layout.Types.Caption, Caption);
Core.registerView(Layout.Types.ButtonText, ButtonText);
Core.registerView(Layout.Types.Overline, Overline);
