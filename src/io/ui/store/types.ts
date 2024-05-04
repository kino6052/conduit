import { EPage, TAppProps } from "../../../types";

export interface IUI {
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void;
}
