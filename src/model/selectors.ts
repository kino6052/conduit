import { TAppProps } from "../io/ui/view/types";
import { getAsyncRefresh } from "../io/ui/view/utils/utils";
import { EPage } from "./pages/types";
import { INavigationService } from "./services/NavigationService/types";

export const generateLoadingPageProps = (
  navigationService: INavigationService,
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
