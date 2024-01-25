import React from "react";
import { App } from "../../App";
import { DefaultAppProps } from "../../__stories__/data";

export const PageDefaultScreen = (): JSX.Element => {
  return <App {...DefaultAppProps} />;
};
