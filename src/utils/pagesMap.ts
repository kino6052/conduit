import { TAppProps, TPagePropsMap } from "../details/view/types";
import { EPage } from "../app/pages/types";

export type TPageMap = {
  [key in EPage]: React.FC<TPagePropsMap[key]>;
};

export const pagesMap = {} as TPageMap;

export function getPropsFromStateSafely<T extends EPage>(
  page: T,
  state: TAppProps<EPage>,
): TAppProps<T> | undefined {
  if (state.page === page) return state as TAppProps<T>;

  return;
}
