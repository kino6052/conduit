import { TWithClassName, TWithId } from "../../utils/types";
import { TButtonProps } from "../Button/types";
import { TIconContentProps } from "../Icon/types";

export type TInputContentProps = TWithId<{
  value: string;
  placeholder: string;
  isTextArea?: boolean;
  error?: string;
  disabled?: boolean;
}>;

export type TInputProps = TWithClassName<TInputContentProps>;

export type TCommentInputProps = TWithId<{
  inputProps: TInputProps;
  buttonProps?: TButtonProps;
  iconProps: TIconContentProps;
}>;
