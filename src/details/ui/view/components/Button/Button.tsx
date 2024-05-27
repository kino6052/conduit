import React from "react";

import styles from "./styles.scss";
import { TButtonProps } from "./types";
import { getClassNames } from "../../../../../utils/styles";

export const Button: React.FC<TButtonProps> = ({
  text = "Text",
  hasIcon = true,
  variant,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={getClassNames(["button", variant, className], styles)}
    >
      <span className="content">{text}</span>
    </button>
  );
};
