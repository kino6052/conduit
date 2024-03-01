import React from "react";
import styles from "./styles.scss";
import { TInputProps } from "./types";

export const Input: React.FC<TInputProps> = (props) => {
  return props.isTextArea ? (
    <textarea className={styles.input} {...props} />
  ) : (
    <input className={styles.input} {...props} />
  );
};
