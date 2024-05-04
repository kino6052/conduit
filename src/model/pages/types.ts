export enum EPage {
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
  initialize(): Promise<void>;
}
