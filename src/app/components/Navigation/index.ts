import { INavigationService } from "../../services/NavigationService/types";
import { ExclusiveSelector } from "../Selector/ExclusiveSelector";
import { TTab } from "../Tab/types";

export const getNavigationTabs = (navigationService: INavigationService) => {
  return new ExclusiveSelector<TTab>(
    navigationService
      .getNavigationTabs()
      .map((id) => ({ id, text: id })) as TTab[],
    async (page) => {
      if (page.id) {
        await navigationService.navigate(page.id);
      }
    },
  );
};
