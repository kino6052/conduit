import { NavigationTab } from "../home/logic";
import { IApp, IAppState } from "../types";
import { TPageMap } from "./map";

export class App implements IApp {
  public tabs = [
    new NavigationTab("Home", "home"),
    new NavigationTab("Profile", "profile"),
  ];

  constructor(
    public pageMap: TPageMap,
    public state: IAppState,
  ) {}
}
