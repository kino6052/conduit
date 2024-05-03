import React from "react";

export type TPaginationBarProps = {
  numberOfPages: number;
  selected: number;
  onClick: React.MouseEventHandler;
};
