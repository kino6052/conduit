import { TWithClassName } from "../../../../utils/types";

export type TIconContentProps = {
  icon: string;
  text?: string;
};

export type TIconProps = TWithClassName<TIconContentProps>;
