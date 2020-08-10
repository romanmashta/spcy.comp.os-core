import React from "react";
import * as Core from "@spcy/lib.model.core";

export const NoComponent: Core.View<unknown> = (props) => {
  const { model } = props;
  const View = Core.queryView(model);
  return <div>!no view for {JSON.stringify(model)}</div>;
};

export const Render: Core.View<unknown> = (props) => {
  const { model } = props;
  const View = Core.queryView(model) || NoComponent;
  return <View model={model} />;
};
