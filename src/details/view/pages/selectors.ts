import { IPage } from "../../../app/entities/pages/types";
import { ETabVariant } from "../components/Tab/types";
import { getAsyncRefresh } from "../utils/utils";

export const generateNavBarProps = (page: IPage, refresh?: () => void) => ({
  logo: {
    onClick: getAsyncRefresh(
      async () => page.navigationTabs?.items[0]?.select(),
      refresh,
    ),
  },
  tabs:
    page.navigationTabs?.items?.map((tab) => {
      return {
        id: tab.id,
        onClick: getAsyncRefresh(tab.select.bind(tab), refresh),
        text: tab.id,
        variant: ETabVariant.Menu,
        isActive: tab.isSelected,
      };
    }) || [],
});
