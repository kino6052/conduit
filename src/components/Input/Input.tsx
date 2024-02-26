import React, { PropsWithChildren } from "react";
import "./styles.scss";

export type TInputProps = PropsWithChildren<
  React.InputHTMLAttributes<{}> & {
    isTextArea?: boolean;
  }
>;

export const Input: React.FC<TInputProps> = (props) => {
  return props.isTextArea ? (
    <textarea className="input" {...props} />
  ) : (
    <input className="input" {...props} />
  );
};
