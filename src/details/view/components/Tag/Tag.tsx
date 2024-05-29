import React from "react";
import styles from "./style.scss";
import { TTagProps } from "./types";
import { getClassNames } from "../../../../utils/styles";

export const Tag: React.FC<TTagProps> = ({ id, className, ...props }) => {
  return (
    <div
      {...props}
      tabIndex={0}
      className={getClassNames(["wrapper", className], styles)}
    >
      <span className={styles.content}>{id}</span>
    </div>
  );
};
