/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  value: string;
  variant: "selected" | "default";
  className: any;
}

export const PaginationButton = ({
  value = "1",
  variant,
  className,
}: Props): JSX.Element => {
  return (
    <div className={`pagination-button variant-1-${variant} ${className}`}>
      <div className="element">{value}</div>
    </div>
  );
};
