import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";
import { TLinkProps } from "../../components/Link/types";

export type TSignInPageProps = {
  usernameInputProps: TInputProps;
  passwordInputProps: TInputProps;
  buttonProps: TButtonProps;
  linkProps: TLinkProps;
  errors?: string[];
};
