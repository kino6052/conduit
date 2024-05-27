import { INavigationService } from "../../services/NavigationService/types";
import { IUserService } from "../../services/UserService/types";
import { SignInPage } from "../SignInPage";
import { IPage } from "../types";

export class SignUpPage extends SignInPage implements IPage {
  constructor(
    userService: IUserService,
    navigationService: INavigationService,
  ) {
    super(userService, navigationService);
    this.submitControl.onActivate = async () => {
      const response = await userService.signUp(
        this.username.value,
        this.password.value,
      );

      if (response.errors) {
        this.username.errorMessage = response.errors["username"];
        this.password.errorMessage = response.errors["password"];
      }
    };
  }
}
