import { update } from "..";
import { ETabConstant } from "../../io/ui/view/components/Tab/constants";
import { DefaultAppProps } from "../../data";
import { EPage } from "../../types";

describe("Navigation", () => {
  it("should visit settings page when clicked ", async () => {
    const result = await update(
      { slug: ETabConstant.Slug, id: EPage.SignUp, type: "onClick" },
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
  "page": "SignUp",
  "pageProps": {
    "buttonProps": {
      "id": "SignUpPageSubmitButtonId",
      "text": "Submit",
    },
    "passwordInputProps": {
      "id": "SignUpPagePasswordInputId",
      "placeholder": "Password",
      "value": "",
    },
    "usernameInputProps": {
      "id": "SignUpPageUserNameInputId",
      "placeholder": "Username",
      "value": "",
    },
  },
}
`);
  });
});
