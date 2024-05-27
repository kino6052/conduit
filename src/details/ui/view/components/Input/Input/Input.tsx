import React from "react";
import styles from "./styles.scss";
import { TInputProps } from "../types";
import { getClassNames } from "../../../../../../utils/styles";
import { Typography } from "../../Typography";

export const Input: React.FC<TInputProps> = ({
  isTextArea,
  className,
  error,
  ...props
}) => {
  const Component = isTextArea ? "textarea" : "input";
  return (
    <div className={styles.wrapper}>
      <Component
        {...props}
        className={getClassNames(["input", className], styles)}
      />
      {error && <Typography value={error} className={styles.error} />}
    </div>
  );
};
