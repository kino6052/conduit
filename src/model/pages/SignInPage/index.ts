import { Control } from "../../components/Control";
import { IControl } from "../../components/Control/types";
import { Field } from "../../components/Field";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { TTab } from "../../components/Tab/types";
import { INavigationService } from "../../services/NavigationService/types";
import { IUserService } from "../../services/UserService/types";
import { EPage, IPage } from "../types";

export class SignInPage implements IPage {
  public pageType: EPage = EPage.SignIn;
  public username: Field<string> = new Field("");
  public password: Field<string> = new Field("");
  public navigationTabs: ExclusiveSelector<TTab>;

  public submitControl: IControl;

  constructor(
    private userService: IUserService,
    private navigationService: INavigationService,
  ) {
    this.navigationTabs = getNavigationTabs(this.navigationService);

    this.submitControl = new Control("Submit", async () => {
      const response = await this.userService.signIn(
        this.username.value,
        this.password.value,
      );

      if (response.errors) {
        this.username.errorMessage = response.errors["username"];
        this.password.errorMessage = response.errors["password"];
      }
    });
  }
}
