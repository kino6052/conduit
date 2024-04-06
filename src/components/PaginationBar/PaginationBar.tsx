import React from "react";
import { PaginationButton } from "../PaginationButton";
import styles from "./style.scss";
import { TPaginationBarProps } from "./types";

export const PaginationBar: React.FC<TPaginationBarProps> = ({
  numberOfPages = 1,
  selected = 0,
}) => {
  const array = new Array(numberOfPages).fill(null);
  return (
    <div className={styles.wrapper}>
      {array.map((_, i) => {
        const isSelected = i === selected;
        const id = String(i);
        const value = String(i + 1);
        return (
          <PaginationButton
            id={id}
            value={value}
            key={id}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};
