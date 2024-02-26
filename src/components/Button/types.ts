export enum EButtonVariant {
  Warning = "warning",
  Primary = "primary",
  Secondary = "secondary",
}

export enum EButtonSize {
  Large = "large",
  Small = "small",
}

export type TButtonProps = {
  text: string;
  hasIcon: boolean;
  variant: EButtonVariant;
  size: EButtonSize;
  id?: string;
  className?: string;
};
