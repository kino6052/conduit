/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { PaginationButton } from "../PaginationButton";
import "./style.scss";

export type TPaginationBarProps = {
  numberOfPages: number;
};

export const PaginationBar: React.FC<TPaginationBarProps> = ({
  numberOfPages = 1,
  selected = 0,
}) => {
  const array = new Array(numberOfPages).fill(null);
  return (
    <div className={`pagination-bar`}>
      {array.map((_, i) => {
        const isSelected = i === selected;
        return (
          <PaginationButton
            value={String(i + 1)}
            variant={isSelected ? "selected" : "default"}
          />
        );
      })}
    </div>
  );
};
