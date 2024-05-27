import React from "react";
import styles from "./styles.scss";
import { TPaginationButtonProps } from "./types";
import { getClassNames } from "../../../../../utils/styles";

export const PaginationButton = ({
  value,
  isSelected,
  className,
  ...props
}: TPaginationButtonProps): JSX.Element => {
  return (
    <button
      className={getClassNames(["button", isSelected && "selected"], styles)}
      {...props}
    >
      <span className={styles.text}>{value}</span>
    </button>
  );
};
