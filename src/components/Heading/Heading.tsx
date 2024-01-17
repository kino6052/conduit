/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  value: string;
  variant: "regular" | "regular-bold" | "regular-grey" | "h-1" | "h-2";
  className: any;
  textClassName: any;
}

export const Heading = ({
  value = "This is text",
  variant,
  className,
  textClassName,
}: Props): JSX.Element => {
  return (
    <div className={`heading ${className}`}>
      <div className={`text ${variant} ${textClassName}`}>{value}</div>
    </div>
  );
};
