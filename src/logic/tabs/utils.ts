import { ETabVariant, TTabProps } from "../../components/Tab/types";
import { ETabType } from "../../components/Tabs/constants";
import { GlobalFeedTab, YourFeedTab } from "../../components/Tabs/data";
import { AppState } from "../data/app";

export const provideTabsProps = (): TTabProps[] => {
  const currentTag = AppState.selectedTagId;
  const currentTab = AppState.currentTab;
  const isLoggedIn = !!AppState.currentUserId;

  return [
    isLoggedIn && {
      ...YourFeedTab,
      isActive: !currentTag && currentTab === ETabType.Personal,
    },
    {
      ...GlobalFeedTab,
      isActive: !currentTag && currentTab === ETabType.Global,
    },
    !!currentTag && {
      isActive: true,
      id: currentTag,
      text: `#${currentTag}`,
      variant: ETabVariant.Default,
    },
  ].filter(Boolean) as TTabProps[];
};
