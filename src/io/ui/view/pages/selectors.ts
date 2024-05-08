import { IPage } from "../../../../model/pages/types";
import { ETabVariant } from "../components/Tab/types";
import { getAsyncRefresh } from "../utils/utils";

export const generateNavBarProps = (page: IPage, refresh?: () => void) => ({
  logo: {
    onClick: getAsyncRefresh(page.tabs[0].open, refresh),
  },
  tabs:
    page.tabs.map((tab) => {
      return {
        id: tab.id,
        onClick: getAsyncRefresh(tab.open, refresh),
        text: tab.name,
        variant: ETabVariant.Menu,
        isActive: tab.isSelected,
      };
    }) || [],
});
