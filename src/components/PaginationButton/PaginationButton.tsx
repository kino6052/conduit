/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Id } from "../../utils/events";
import { withEventWrapper } from "../../utils/withEventWrapper";
import "./style.css";

interface Props {
  value: string;
  variant: "selected" | "default";
  className: any;
  id: Id;
}

export const id = "pagination-button";

const _PaginationButton = ({
  value = "1",
  variant,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={`pagination-button variant-1-${variant} ${className}`}
    >
      <span className="element">{value}</span>
    </button>
  );
};

export const PaginationButton = withEventWrapper([
  "onClick",
  "onBlur",
  "onKeyDown",
])(_PaginationButton);
