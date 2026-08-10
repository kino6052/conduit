import { EPage, IPage } from "../../app/entities/pages/types";
import { TAppProps } from "./types";
import { getAsyncRefresh } from "./utils/utils";

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
