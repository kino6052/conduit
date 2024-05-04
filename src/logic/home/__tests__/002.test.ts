import { update } from "../..";
import { ETabConstant } from "../../../io/ui/view/components/Tab/constants";
import { DefaultAppProps } from "../../../data";
import { EPage } from "../../../io/ui/view/types";

describe("Home Page", () => {
  it("should visit settings page when clicked ", async () => {
    const result = await update(
      { slug: ETabConstant.Slug, id: EPage.Settings, type: "onClick" },
      DefaultAppProps,
    );

    expect(result).toMatchInlineSnapshot(`
{
  "navbarProps": {
    "tabs": [
      {
        "id": "Home",
        "text": "Home",
        "variant": "menu",
      },
      {
        "id": "SignIn",
        "text": "Sign In",
        "variant": "menu",
      },
      {
        "id": "SignUp",
        "text": "Sign Up",
        "variant": "menu",
      },
    ],
  },
  "page": "Settings",
  "pageProps": {
    "bioInputProps": {
      "id": "BioInputId",
      "placeholder": "Short bio",
      "value": "",
    },
    "buttonProps": {
      "id": "SettingsPageSubmitButtonId",
      "text": "Submit",
    },
    "imageUrlInputProps": {
      "id": "SettingsPageImageURLInputId",
      "placeholder": "Image URL",
      "value": "",
    },
    "logoutButtonProps": {
      "id": "SettingsPageLogoutButtonId",
      "text": "Log out",
    },
    "passwordInputProps": {
      "id": "SettingsPagePasswordInputId",
      "placeholder": "Password",
      "value": "",
    },
    "usernameInputProps": {
      "id": "SettingsPageUserNameInputId",
      "placeholder": "Username",
      "value": "",
    },
  },
}
`);
  });
});
