import { TButtonContentProps } from "../../components/Button/types";
import { TInputContentProps } from "../../components/Input/types";

export type TSettingsPageProps = {
  usernameInputProps: TInputContentProps;
  passwordInputProps: TInputContentProps;
  imageUrlInputProps: TInputContentProps;
  bioInputProps: TInputContentProps;
  buttonProps: TButtonContentProps;
  logoutButtonProps: TButtonContentProps;
};
