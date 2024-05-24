import { EPage } from "../../../model/pages/types";
import { IAppState } from "../../../model/types";
import { TAppProps } from "../view/types";

export type TPropsMap = { [K in EPage]: (state: IAppState, refresh?: () => void) => TAppProps<K> } ;

export interface IViewModel {
  onPropsChange: (cb: (props: TAppProps<EPage> | undefined) => void) => void;
}
