import { ISelector } from "../components/Selector/types";
import { TTab } from "../components/Tab/types";

export enum EPage {
  Loading = "Loading",
  Home = "Home",
  Article = "Article",
  NewArticle = "NewArticle",
  EditArticle = "EditArticle",
  Settings = "Settings",
  Profile = "Profile",
  SignUp = "SignUp",
  SignIn = "SignIn",
}

export interface IPage {
  pageType: EPage;
  navigationTabs: ISelector<TTab>;
  isLoading: boolean;
}
