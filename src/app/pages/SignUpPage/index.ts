import { INavigationService } from "../../services/NavigationService/types";
import { IUserService } from "../../services/UserService/types";
import { SignInPage } from "../SignInPage";
import { EPage, IPage } from "../types";

export class SignUpPage extends SignInPage implements IPage {
  public pageType = EPage.SignUp;

  constructor(
    userService: IUserService,
    navigationService: INavigationService,
  ) {
    super(userService, navigationService);
  }

  protected override async validate() {
    const isValid = Boolean(this.password.value && this.username.value);
    this.submitControl.isDisabled = !isValid;
  }

  protected override async onSubmit() {
      this.username.isDisabled = true;
      this.password.isDisabled = true;

      const response = await this.userService.signUp(
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
