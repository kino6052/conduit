import React from "react";
import { PaginationButton } from "../PaginationButton";
import styles from "./style.scss";
import { TPaginationBarProps } from "./types";

export const PaginationBar: React.FC<TPaginationBarProps> = ({ pages }) => {
  return (
    <div className={styles.wrapper}>
      {pages.map((page) => {
        return (
          <PaginationButton
            id={page.text}
            value={page.text}
            key={page.text}
            isSelected={page.isSelected}
            onClick={page.onClick}
          />
        );
      })}
    </div>
  );
};
