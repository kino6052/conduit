import React from "react";
import { PageDefault } from "../../pages/HomePage";
import { DefaultState } from "../../pages/HomePage/HomePage";

export const PageDefaultScreen = (): JSX.Element => {
  return <PageDefault {...DefaultState} />;
};
