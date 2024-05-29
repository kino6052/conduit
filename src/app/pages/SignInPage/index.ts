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
  public username: Field<string>;
  public password: Field<string>;
  public navigationTabs: ExclusiveSelector<TTab>;

  public submitControl: IControl;

  constructor(
    protected userService: IUserService,
    protected navigationService: INavigationService,
  ) {
    this.navigationTabs = getNavigationTabs(this.navigationService);

    this.submitControl = new Control("Submit", this.onSubmit.bind(this));
    this.submitControl.isDisabled = true;

    this.username = new Field("", this.validate.bind(this));
    this.password = new Field("", this.validate.bind(this));
  }

  protected async validate() {
    const isValid = Boolean(this.password.value && this.username.value);
    this.submitControl.isDisabled = !isValid;
  }

  protected async onSubmit() {
    this.username.isDisabled = true;
    this.password.isDisabled = true;

    const response = await this.userService.signIn(
      this.username.value,
      this.password.value,
    );

    if (response.errors) {
      this.username.errorMessage = response.errors["username"];
      this.password.errorMessage = response.errors["password"];
    }

    this.username.isDisabled = false;
    this.password.isDisabled = false;
  }
}
