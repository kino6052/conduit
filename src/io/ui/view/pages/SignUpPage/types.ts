import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";
import { TLinkProps } from "../../components/Link/types";

export type TSignUpPageProps = {
  usernameInputProps: TInputProps;
  passwordInputProps: TInputProps;
  buttonProps: TButtonProps;
  documentationLinkProps: TLinkProps;
};
