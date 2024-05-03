import { EPage } from "../types";
import { TPageMap } from "./app/map";

export interface ITab {
  name: string;
  id: string;
  isSelected: boolean;
}

export interface INavbar {
  tabs: ITab[];
  selectedTab: EPage;
  selectTab: (page: EPage) => void;
}

export interface IPage {}

export interface IApp {
  pageMap: TPageMap;
  navbar: INavbar;
}
