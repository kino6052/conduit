/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Icon } from "../Icon";
import "./style.css";

interface Props {
  text: string;
  hasIcon: boolean;
  variant:
    | "warning"
    | "secondary-small"
    | "primary-large"
    | "secondary-large"
    | "primary-small"
    | "warning-large";
  className: string;
  divClassName: string;
}

export const Button = ({
  text = "Text",
  hasIcon = true,
  variant,
  className,
  divClassName,
  ...props
}: Props): JSX.Element => {
  return (
    <button {...props} className={`button ${variant} ${className}`}>
      {hasIcon && (
        <Icon
          className="icon-3"
          divClassName={`${
            ["warning-large", "warning"].includes(variant) && "class-5"
          }`}
          icon="favorite"
          variant="with-icon"
        />
      )}

      <div className={`text-2 ${divClassName}`}>{text}</div>
    </button>
  );
};
