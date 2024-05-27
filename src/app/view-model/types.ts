import { EPage, IPage } from "../pages/types";
import { TAppProps } from "../../details/ui/view/types";

export type TPropsMap = Partial<{
  [K in EPage]: (
    page: IPage,
    refresh?: () => void,
  ) => TAppProps<K>;
}>;

export interface IViewModel {
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void;
  generateProps: (
    page: IPage,
    refresh?: () => void,
  ) => TAppProps<EPage> | undefined;
}
