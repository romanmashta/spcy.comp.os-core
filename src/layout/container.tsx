import _ from "lodash";
import React from "react";
import { Grid } from "@material-ui/core";
import * as Core from "@spcy/lib.standard.core";
import * as Layout from "@spcy/lib.standard.layout";
import { Render } from "./render";

const RenderItem: Core.View<unknown> = (props) => {
  const { model } = props;
  return (
    <Grid item xs>
      <Render model={model} />
    </Grid>
  );
};

export const Container: Core.View<Layout.Container> = (props) => {
  const {
    model: { elements },
  } = props;

  return (
    <Grid container item xs direction="column">
      {_.map(elements, (e) =>
        Layout.isRow(e) || Layout.isContainer(e) ? (
          <Render model={e} />
        ) : (
          <RenderItem model={e} />
        )
      )}
    </Grid>
  );
};

export const Row: Core.View<Layout.Row> = (props) => {
  const {
    model: { columns },
  } = props;

  return (
    <Grid container item xs direction="row">
      {_.map(columns, (e) =>
        Layout.isRow(e) || Layout.isContainer(e) ? (
          <Render model={e} />
        ) : (
          <RenderItem model={e} />
        )
      )}
    </Grid>
  );
};

Core.registerView(Layout.Types.Container, Container);
Core.registerView(Layout.Types.Row, Row);
