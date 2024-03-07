import React from "react";
import styles from "./styles.scss";
import { TInputProps } from "../types";
import { getClassNames } from "../../../utils/styles";

export const Input: React.FC<TInputProps> = (props) => {
  const Component = props.isTextArea ? "textarea" : "input";
  return (
    <Component
      {...props}
      className={getClassNames(["input", props.className], styles)}
    />
  );
};
