import { EPage, IPage } from "../../../model/pages/types";
import { INavigationService } from "../../../model/services/NavigationService/types";
import { TAppProps } from "../view/types";

export type TPropsMap = Partial<{
  [K in EPage]: (
    navigationService: INavigationService,
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
