import React from "react";
import styles from "./style.scss";
import { TIconProps } from "./types";
import { getClassNames } from "../../../../../utils/styles";

export const Icon: React.FC<TIconProps> = ({
  icon = "favorite",
  className,
}) => {
  return (
    <div className={getClassNames(["icon", className], styles)}>{icon}</div>
  );
};
