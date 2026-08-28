import { INavigationService } from "../../../interfaces/services/NavigationService/types";
import { IUserService } from "../../../interfaces/services/UserService/types";
import { Control } from "../../components/Control";
import { IControl } from "../../components/Control/types";
import { Field } from "../../components/Field";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { TTab } from "../../components/Tab/types";
import { EPage, IPage } from "../types";

export class SettingsPage implements IPage {
  public pageType: EPage = EPage.Settings;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");
  public imageSrc: Field<string> = new Field("");
  public bio: Field<string> = new Field("");
  public navigationTabs: ExclusiveSelector<TTab>;

  public saveControl: IControl;
  public logoutControl: IControl;

  private constructor(
    public userService: IUserService,
    public navigationService: INavigationService,
  ) {
    this.navigationTabs = getNavigationTabs(navigationService);

    this.saveControl = new Control("Save", async () => {
      await this.userService.updateUser(
        this.username.value,
        this.password.value,
        this.imageSrc.value,
        this.bio.value,
      );
    });

    this.logoutControl = new Control("Save", async () => {
      await this.userService.logout();
    });
  }

  public static async create(
    userService: IUserService,
    navigationService: INavigationService,
  ) {
    const user = await userService.getCurrentUser();

    const page = new SettingsPage(userService, navigationService);

    if (!user) {
      await navigationService.navigate(EPage.Home);
      return page;
    }

    page.username.value = user.userInfo.username;
    page.password.value = "";
    page.imageSrc.value = user.userInfo.imageSrc ?? "";
    page.bio.value = user.userInfo.bio ?? "";

    return page;
  }
}
