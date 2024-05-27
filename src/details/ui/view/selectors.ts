import { TAppProps } from "./types";
import { getAsyncRefresh } from "./utils/utils";
import { EPage, IPage } from "../../../app/pages/types";
import { INavigationService } from "../../../app/services/NavigationService/types";

export const generateLoadingPageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.Loading> => ({
  page: EPage.Loading,
  navbarProps: {
    logo: { onClick: async () => {} },
    tabs: [],
  },
  pageProps: {
    onMount: getAsyncRefresh(async () => {}, refresh),
  },
});
