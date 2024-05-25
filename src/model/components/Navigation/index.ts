import { EPage } from "../../pages/types";
import { INavigationService } from "../../services/NavigationService/types";
import { ExclusiveSelector } from "../Selector/ExclusiveSelector";
import { TTab } from "../Tab/types";

export const getNavigationTabs = (navigationService: INavigationService) =>
  new ExclusiveSelector<TTab>(
    [
      {
        id: EPage.Home,
      },
      {
        id: EPage.NewArticle,
      },
      {
        id: EPage.Settings,
      },
      {
        id: EPage.SignIn,
      },
      {
        id: EPage.SignUp,
      },
    ].filter(Boolean) as TTab[],
    async (page) => navigationService.navigate(page.id),
  );
