import { TWithOnMountHandler } from "../../../../../utils/types";
import { TButtonProps } from "../../components/Button/types";
import { TInputProps } from "../../components/Input/types";
import { TLinkProps } from "../../components/Link/types";

export type TSignUpPageProps = TWithOnMountHandler<{
  usernameInputProps: TInputProps;
  passwordInputProps: TInputProps;
  buttonProps: TButtonProps;
  documentationLinkProps: TLinkProps;
}>;
