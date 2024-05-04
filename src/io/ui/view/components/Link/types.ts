import React from "react";
import { TWithClassName, TWithClickHandler } from "../../../../../utils/types";

export type TLinkProps = TWithClickHandler<
  TWithClassName<{
    href?: string;
    onClick: React.MouseEventHandler;
  }>
>;
