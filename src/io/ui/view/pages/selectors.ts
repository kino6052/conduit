import { IAppState } from "../../../../model/types";
import { ETabVariant } from "../components/Tab/types";

export const generateNavBarProps = (
  state: IAppState,
  refresh?: () => void,
) => ({
  logo: {
    onClick: () => alert("Test"),
  },
  tabs:
    state.tabs.map((tab) => {
      return {
        id: tab.id,
        onClick: () => {
          tab.open().then(() => {
            refresh?.();
          });
          refresh?.();
        },
        text: tab.name,
        variant: ETabVariant.Menu,
        isActive: tab.isSelected,
      };
    }) || [],
});
