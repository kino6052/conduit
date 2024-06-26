import { TAppProps } from "../view/types";
import { EPage, IPage } from "../../app/entities/pages/types";

export type TPropsMap = Partial<{
  [K in EPage]: (page: IPage, refresh?: () => void) => TAppProps<K>;
}>;

export interface IViewModel {
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void;
  generateProps: (
    page: IPage,
    refresh?: () => void,
  ) => TAppProps<EPage> | undefined;
}
