import React from "react";
import styles from "./styles.scss";
import { TInputProps } from "../types";
import { getClassNames } from "../../../utils/styles";

export const Input: React.FC<TInputProps> = (props) => {
  return props.isTextArea ? (
    <textarea
      {...props}
      className={getClassNames(["input", props.className], styles)}
    />
  ) : (
    <input
      {...props}
      className={getClassNames(["input", props.className], styles)}
    />
  );
};
