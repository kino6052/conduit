import React from "react";
import styles from "./styles.scss";
import { ETypographyType, TTypographyProps } from "./types";
import { getClassNames } from "../../../../utils/styles";

export const Typography: React.FC<TTypographyProps> = ({
  value,
  variant = ETypographyType.Regular,
  className,
}) => {
  return (
    <span className={getClassNames(["text", variant, className], styles)}>
      {value}
    </span>
  );
};
