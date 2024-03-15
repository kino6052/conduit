import { TWithId } from "../../utils/types";

export enum EButtonVariant {
  Warning = "warning",
  Primary = "primary",
  Secondary = "secondary",
}

export enum EButtonSize {
  Large = "large",
  Small = "small",
}

export type TButtonConfigProps = {
  variant: EButtonVariant;
  size: EButtonSize;
  className: string;
};

export type TButtonContentProps = TWithId<{
  text: string;
  hasIcon?: boolean;
}>;

export type TButtonProps = Partial<TButtonConfigProps> &
  TButtonContentProps;
