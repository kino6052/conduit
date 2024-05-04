import {
  ETabType,
  ETabsPanelConstant,
} from "../../io/ui/view/components/Tabs/constants";
import { IEvent } from "../../utils/events";
import { AppState } from "../data/app";

export class TabsLogic {
  static handleTabClick(event: IEvent) {
    const tabId = event.id;

    if (tabId === ETabsPanelConstant.GeneralTabId) {
      AppState.selectedTagId = undefined;
      AppState.currentTab = ETabType.Global;
      return;
    }

    if (tabId === ETabsPanelConstant.PersonalTabId) {
      AppState.selectedTagId = undefined;
      AppState.currentTab = ETabType.Personal;
      return;
    }

    AppState.currentTab = ETabType.Tag;
  }
}
