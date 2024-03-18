import { TButtonContentProps } from "../../components/Button/types";
import { TInputContentProps } from "../../components/Input/types";
import { TLinkProps } from "../../components/Link/types";

export type TSignInPageProps = {
  usernameInputProps: TInputContentProps;
  passwordInputProps: TInputContentProps;
  buttonProps: TButtonContentProps;
  linkProps: TLinkProps;
  errors?: string[];
};
