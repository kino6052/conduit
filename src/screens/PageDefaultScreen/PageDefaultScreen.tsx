import React from "react";
import { PageDefault } from "../../pages/PageDefault";
import { DefaultState } from "../../pages/PageDefault/PageDefault";

export const PageDefaultScreen = (): JSX.Element => {
  return <PageDefault {...DefaultState} />;
};
