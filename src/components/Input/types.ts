import { TWithChangeHandler, TWithClassName } from "../../utils/types";
import { TButtonProps } from "../Button/types";
import { TIconContentProps } from "../Icon/types";
import { TUserInfoProps } from "../UserInfo/types";

export type TInputContentProps = {
  value: string;
  placeholder: string;
  isTextArea?: boolean;
  error?: string;
  disabled?: boolean;
};

export type TInputProps = TWithChangeHandler<
  TWithClassName<TInputContentProps>
>;

export type TCommentInputProps = {
  inputProps: TInputProps;
  buttonProps?: TButtonProps;
  iconProps: TIconContentProps;
  userInfoProps?: TUserInfoProps;
};
