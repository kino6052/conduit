import React from "react";

import "./styles.scss";
import { TButtonProps } from "./types";

export const Button: React.FC<TButtonProps> = ({
  text = "Text",
  hasIcon = true,
  variant,
  className,
  ...props
}) => {
  const buttonClassName = ["button", variant, className].join(" ");
  return (
    <button {...props} className={buttonClassName}>
      {/* {hasIcon && <Icon />} */}

      <div className="wrapper">{text}</div>
    </button>
  );
};
