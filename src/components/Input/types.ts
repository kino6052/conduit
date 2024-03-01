import { PropsWithChildren } from "react";

export type TInputProps = PropsWithChildren<
  React.InputHTMLAttributes<{}> & {
    isTextArea?: boolean;
  }
>;