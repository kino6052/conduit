import { EPage } from "../../../model/pages/types";
import { TAppProps } from "../view/types";

export interface IUI {
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void;
}
