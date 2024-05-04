import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";

export type TSettingsPageProps = {
  usernameInputProps: TInputProps;
  passwordInputProps: TInputProps;
  imageUrlInputProps: TInputProps;
  bioInputProps: TInputProps;
  buttonProps: TButtonProps;
  logoutButtonProps: TButtonProps;
};
