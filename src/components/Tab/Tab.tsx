import React from "react";
import { getClassNames } from "../../utils/styles";
import { Icon } from "../Icon";
import styles from "./style.scss";
import { ETabVariant, TTabProps } from "./types";

export const Tab: React.FC<TTabProps> = ({
  isActive,
  text,
  variant = ETabVariant.Default,
  icon,
  ...props
}) => {
  return (
    <div
      {...props}
      className={getClassNames(
        ["wrapper", variant, isActive && "active"],
        styles,
      )}
    >
      {icon && <Icon icon={icon} />}
      <div className={styles.content}>{text}</div>
    </div>
  );
};
