import { TWithOnMountHandler } from "../../../../../utils/types";
import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";

export type TSettingsPageProps = TWithOnMountHandler<{
  usernameInputProps: TInputProps;
  passwordInputProps: TInputProps;
  imageUrlInputProps: TInputProps;
  bioInputProps: TInputProps;
  buttonProps: TButtonProps;
  logoutButtonProps: TButtonProps;
}>;
