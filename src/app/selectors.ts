import { TAppProps } from "../details/ui/view/types";
import { getAsyncRefresh } from "../details/ui/view/utils/utils";
import { EPage, IPage } from "./pages/types";
import { INavigationService } from "./services/NavigationService/types";

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
