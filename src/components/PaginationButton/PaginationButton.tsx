/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { TWithId } from "../../utils/withEventWrapper";
import "./style.css";

type TPaginationButtonProps = TWithId<{
  value: string;
  variant: "selected" | "default";
  className: any;
}>;

export const slug = "pagination-button";

export const PaginationButton = ({
  value = "1",
  variant,
  className,
  ...props
}: TPaginationButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={`pagination-button variant-1-${variant} ${className}`}
    >
      <span className="element">{value}</span>
    </button>
  );
};
