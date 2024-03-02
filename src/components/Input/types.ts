import { TWithClassName, TWithId } from "../../utils/types";
import { TButtonContentProps } from "../Button/types";
import { TIconContentProps } from "../Icon/types";

export type TInputContentProps = TWithId<{
  value: string;
  placeholder: string;
  isTextArea?: boolean;
}>;

export type TInputProps = TWithClassName<TInputContentProps>;

export type TCommentInputProps = TWithId<{
  inputProps: TInputContentProps;
  buttonProps: TButtonContentProps;
  iconProps: TIconContentProps;
}>;
