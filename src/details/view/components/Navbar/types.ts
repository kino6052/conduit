import { TWithClassName, TWithClickHandler } from "../../../../utils/types";
import { TTabProps } from "../Tab/types";

export type TNavbarProps = TWithClassName<{
  tabs: TTabProps[];
  logo: TWithClickHandler<{}>;
}>;
